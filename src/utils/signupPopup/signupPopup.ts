import { toast } from "sonner";

interface SignupPopupProps {
    url: string;
}

const signupPopup = async ({ url }: SignupPopupProps): Promise<boolean> => {
    const promise = new Promise((resolve, reject) => {
        const popupWindow: Window | null = window.open(url, '_blank', 'width=600,height=600');

        const checkPopup = setInterval(() => {
            try {
                if (!popupWindow || popupWindow.closed) {
                    clearInterval(checkPopup);
                    reject(new Error('Popup window is closed'));
                }

                const popupLocation = popupWindow?.location;

                if (popupLocation?.href.includes('github.com/login')) {
                    // GitHub login page is still open
                    console.log('Waiting for GitHub login...');
                    toast.info('Waiting for GitHub login...');
                } else if (popupLocation?.href.includes('github.com')) {
                    // GitHub login completed, refresh the popup window
                    popupWindow?.location.reload();
                }
                if (popupLocation?.href.includes('access_token')) {
                    console.log('Authentication successful');
                    popupWindow?.close();
                    clearInterval(checkPopup);
                    resolve(true);
                } else if (popupLocation?.href.includes('error')) {
                    console.error('Authentication error');
                    popupWindow?.close();
                    clearInterval(checkPopup);
                    resolve(false);
                }
            } catch (error) {
                console.error(error.message);
            }
        }, 500);
    });

    toast.promise(promise, {
        loading: 'Access granted, authentication successful.',
        success: 'Access granted, authentication successful.',
        error: 'Credentials didn\'t pass authentication check.',
    });

    return promise as Promise<boolean>;

};

export { signupPopup };

