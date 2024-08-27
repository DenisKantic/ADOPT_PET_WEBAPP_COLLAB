'use server'
import * as z from 'zod'
import bcrypt from 'bcryptjs'
import { RegisterSchema } from '@public/schema'
import axios from 'axios'

export async function Register(formData: any) {
  try {
    const response = axios.post('http://localhost:8080', {
      formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.status
  } catch (error) {
    console.log('ERROR IN ACTION', error)
  }
}
