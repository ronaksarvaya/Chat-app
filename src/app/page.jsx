'use client'

import { useChat } from 'ai/react'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'
import React from 'react'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const [savedMessages, setSavedMessages] = useState([])

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true })
      
      if (error) console.error('Error fetching messages:', error)
      else setSavedMessages(data)
    }

    fetchMessages()

    const subscription = supabase
      .channel('messages')
      .on('INSERT', (payload) => {
        setSavedMessages((current) => [...current, payload.new])
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (input.trim()) {
      await supabase.from('messages').insert({ content: input, user_id: 'user' })
      handleSubmit(e)
    }
  }

  return (
  <>
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="flex-grow overflow-y-auto space-y-4 mb-4">
        {savedMessages.map((m) => (
          <div key={m.id} className={`p-2 rounded ${m.user_id === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'}`}>
            {m.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleFormSubmit} className="flex">
        <input
          className="flex-grow p-2 border border-gray-300 rounded"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
        <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">Send</button>
      </form>
    </div>
    </>
  )
}

