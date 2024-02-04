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

export default function Chat() {
  let id = 0;
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setChatHistory([...chatHistory, { role: "user", content: userInput }]);
    const chat = [...chatHistory, { role: "user", content: userInput }];
    apiServices.completeText(chat).then((reply) => {
      console.log(reply);
      setChatHistory([...chat, reply]);
    });
    setUserInput("");
  };

  return (
    <Card className="w-[440px] ">
      <CardHeader>
        <CardTitle> Chat AI </CardTitle>
        <CardDescription>Your AI friend</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] w-full pr-4">
          {chatHistory.map((message, id) => {
            return (
              <div key={id} className="flex gap-3 text-slate-600 text-sm mb-4">
                {message.role === "user" && (
                  <Avatar>
                    <AvatarFallback>KY</AvatarFallback>
                  </Avatar>
                )}
                {message.role === "assistant" && (
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                )}

                <p className="leading-relaxed">
                  <span className="block font-bold text-slate-700">
                    {message.role === "user" ? "User" : "AI"}
                  </span>
                  {message.content}
                </p>
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form className="w-full flex gap-2" onSubmit={handleSubmit}>
          <Input
            placeholder="How Can I help you?"
            value={userInput}
            onChange={handleInputChange}
          />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  );
}
