import React from 'react'
import { Button } from '../../ui'
import { Link } from 'react-router-dom'
import { Separator } from '../../ui/'
import { DiVim } from 'react-icons/di'

const LogDialog = () => {
    return (<div>
        <div data-state="open" className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" style={{ pointerEvents: 'auto' }} data-aria-hidden="true" aria-hidden="true">

        </div>
        <div role="dialog" id="radix-:r3:" aria-describedby="radix-:r5:" aria-labelledby="radix-:r4:" data-state="open" className="fixed left-[50%] top-[50%] z-50 grid w-[90%] max-w-[700px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg sm:max-w-[725px]" style={{ pointerEvents: 'auto' }}>
            <h1 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">Welcome back to  <div className="top flex items-center">
                The
                <DiVim size={40} />
                agen
            </div>

            </h1>
            <div className="flex gap-8">
                <div className="w-full grid gap-4 h-[150px]">
                    <p className="text-sm text-muted-foreground">If you&apos;re not logged in, don&apos;t worry! Grab your favorite snack, log in, and let the awesomeness begin.</p>

                    <Link to="/auth/signin" className="w-full">
                        <Button variant="default" className="w-full">
                            Log in
                        </Button>
                    </Link>

                </div>
                <Separator orientation="vertical" />
                <div className="w-full grid gap-4">
                    <p className="text-sm text-muted-foreground">Not logged in? No worries! Log in for the full experience. Don&apos;t have an account? Create one and join the fun! 🚀</p>
                    <Link to="/auth/signup" className="w-full">
                        <Button variant="default" className="w-full">
                            Sign Up
                        </Button>
                    </Link>

                </div>

            </div>
        </div>
    </div>)
}

export default LogDialog
