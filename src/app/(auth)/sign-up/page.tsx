"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import * as z from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceCallback } from 'usehooks-ts'
import { toast } from "sonner";
import { useRouter } from "next/navigation"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signUpSchema } from "@/schemas/signupschema"
export default function SignUpForm() {
    const [username, setUserName] = useState('')
    const [usernameMessage, setUsernameMessage] = useState('')
    const [isCheckingUsername, setisCheckingUsername] = useState(false)
    const [isSubmiiting, setisSubmiting] = useState(false)
    const debounced = useDebounceCallback(setUserName, 500)


    const router = useRouter()


    // zod implementation

    const form = useForm({
        // resolver needs schema
        resolver: zodResolver(signUpSchema),

        defaultValues: {
            username: '',
            email: '',

            password: ''
        }
    })
    useEffect(() => {
        const checkUniqueUsername = async () => {
            if (username) {
                setisCheckingUsername(true)
                setUsernameMessage('')
                try {
                    const response = await axios.get(`/api/check-unique-username?username=${username}`)
                    // console.log(response);

                    setUsernameMessage(response.data.message)
                } catch (error) {

                    const axiosError = error as AxiosError<ApiResponse>
                    setUsernameMessage(axiosError.response?.data.message ?? "Error while checking Username")
                }
                finally {
                    setisCheckingUsername(false)
                }
            }
        }
        checkUniqueUsername()
    }, [username])

    // onsubmit handler

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        console.log("Form submitted with data:", data);
        setisSubmiting(true)

        try {

            const response = await axios.post<ApiResponse>('/api/sign-up', data)

            toast.success(response.data.message, {
                description: 'You will be redirected to verification page',
                duration: 3000
            })

            // redirect to verify page 
            router.replace(`/verifycode/${username}`);
        } catch (error) {
            console.log("Error in signup of user", error);
            const axiosError = error as AxiosError<ApiResponse>
            // Default error message
            let errorMessage = axiosError.response?.data.message
            toast.error("SignUp Failed", {
                description: errorMessage,
                duration: 5000
            })
        } finally {
            setisSubmiting(false)
        }

    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center text-black">
                    <h1 className="text-4xl  font-extrabold tracking-tight lg:text-5xl mb-6">
                        Join True Feedback
                    </h1>
                    <p className="mb-4">Sign up to start your anonymous adventure</p>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 text-black"
                    >
                        <FormField
                            name="username"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <Input
                                        {...field}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            field.onChange(e);
                                            debounced(e.target.value);
                                        }}
                                    />
                                    {isCheckingUsername && <Loader2 className="animate-spin" />}
                                    {!isCheckingUsername && usernameMessage && (
                                        <p
                                            className={`text-sm ${usernameMessage === 'Username is available'
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                                }`}
                                        >
                                            {usernameMessage}
                                        </p>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <Input {...field} name="email" className="text-black" />
                                    <p className=' text-sm text-black'>We will send you a verification code</p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <Input type="password" {...field} name="password" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='w-full text-white bg-slate-800' disabled={isSubmiiting || !form.formState.isValid} >
                            {isSubmiiting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Sign Up'
                            )}
                        </Button>
                    </form>
                </Form>
                
                <div className="text-center mt-4">
                    <p>
                        Already a member?{' '}
                        <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}


