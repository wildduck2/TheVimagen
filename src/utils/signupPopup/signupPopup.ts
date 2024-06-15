import { toast } from 'sonner';

interface SignupPopupProps {
  url: string;
}

const signupPopup = async ({ url }: SignupPopupProps): Promise<boolean> => {
  const promise = new Promise((resolve, reject) => {
    const width = 600;
    const height = 600;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
    const popupWindow: Window | null = window.open(
      url,
      '_blank',
      `width=${width},height=${height}, left=${left}, top=${top}`,
    );

    const checkPopup = setInterval(() => {
      try {
        if (!popupWindow || popupWindow.closed) {
          clearInterval(checkPopup);
          reject(new Error('Popup window is closed'));
        }

        const popupLocation = popupWindow?.location;

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
    loading: 'Waiting for GitHub login...',
    success: 'Access granted, authentication successful.',
    error: "Credentials didn't pass authentication check.",
  });

  return promise as Promise<boolean>;
};

export { signupPopup };
