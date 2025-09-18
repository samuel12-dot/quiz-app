"use client"

import Questions from "@/components/Questions"
import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectItem } from "@/components/ui/select"
import { SelectContent, SelectTrigger, SelectValue } from "@radix-ui/react-select"
import { Button } from "@/components/ui/button"

export default function Home() {

  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState(9)
  const [difficulty, setDifficulty] = useState('easy')
  const [quizStarted, setQuizStarted] = useState(false)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("https://opentdb.com/api_category.php")
      const data = await res.json()
      setCategories(data.trivia_categories)
    }

    getCategories()
  }, [])

  const  startTrivia = async () => {
    const res = await fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`)
    const data = await res.json()
    setQuestions(data.results)
    setQuizStarted(true)
  }

  if(!quizStarted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center rounded-lg border p-6">
        <div className="rounded-2xl border p-6">
          <h1 className="mb-4 text-center text-4xl font-bold">Quiz App</h1>

          <div className="w-full max-w-md space-y-4">
            <div>
              <Label>Select Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[450px] my-4">
                  <SelectValue placeholder="Select category"  />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Select difficulty</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={startTrivia} variant="outline">Start Quiz</Button>
          </div>
        </div> 
      </div>
    )
  }

  return (
    <div>
      <Questions questions={questions} setQuizStarted={setQuizStarted} />
      </div>
  );
}
