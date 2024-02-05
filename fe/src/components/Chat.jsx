import { useState } from "react";
import apiServices from "../services/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Loader from "./ui/loader";
import { AudioRecorder } from "react-audio-voice-recorder";

export default function Chat() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setChatHistory([...chatHistory, { role: "user", content: userInput }]);
    const chat = [...chatHistory, { role: "user", content: userInput }];
    try {
      const reply = await apiServices.completeText(chat);
      console.log(reply);
      setChatHistory([...chat, reply]);
    } catch (error) {
      console.error("Error completing text:", error);
    } finally {
      setIsLoading(false);
    }
    setUserInput("");
  };

  const handleRecordingComplete = async (blob) => {
    setIsLoading(true);
    try {
      const transcript = await apiServices.transcribe(blob);
      console.log(transcript);
      const audio_input = { role: "user", content: transcript };
      const chat = [...chatHistory, audio_input];
      setChatHistory(chat);
      const reply = await apiServices.completeText(chat);
      console.log(reply);
      setChatHistory([...chat, reply]);
    } catch (error) {
      console.error("Error completing text:", error);
    } finally {
      setIsLoading(false);
    }

    console.log("recording Complete");
  };

  return (
    <div className="relative">
      <Card className="w-full">
        <CardHeader>
          <CardTitle> Chat AI </CardTitle>
          <CardDescription>Your AI friend</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] w-full pr-4">
            {chatHistory.map((message, id) => {
              return (
                <div
                  key={id}
                  className="flex gap-3 text-slate-600 text-sm mb-4"
                >
                  {message.role === "user" && (
                    <Avatar>
                      <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                  )}
                  {message.role === "assistant" && (
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                  )}

                  <div className="leading-relaxed">
                    <span className="block font-bold text-slate-700">
                      {message.role === "user" ? "You" : "Friend"}
                    </span>
                    <div className="bg-gray-100 p-3 rounded">
                      {message.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form className="w-full flex gap-2" onSubmit={handleSubmit}>
            <Input
              placeholder="Start chatting here..."
              value={userInput}
              onChange={handleInputChange}
            />
            <Button type="submit">Send</Button>
            <AudioRecorder
              onRecordingComplete={handleRecordingComplete}
              audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true,
              }}
            />
          </form>
        </CardFooter>
        {isLoading && <Loader />}
      </Card>
    </div>
  );
}
