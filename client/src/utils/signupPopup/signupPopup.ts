import { toast } from 'sonner'

interface SignupPopupProps {
  url: string
}

const signupPopup = async ({ url }: SignupPopupProps): Promise<boolean> => {
  const width = 600
  const height = 600
  const left = (screen.width - width) / 2
  const top = (screen.height - height) / 2
  const popupWindow: Window | null = window.open(
    url,
    '_blank',
    `width=${width},height=${height}, left=${left}, top=${top}`,
  )
  console.log(url)

  try {
    const popupLocation = popupWindow?.location

    if (popupLocation?.href.includes('access_token')) {
      console.log('Authentication successful')
      popupWindow?.close()
    } else if (popupLocation?.href.includes('error')) {
      console.error('Authentication error')
      popupWindow?.close()
    }
  } catch (error) {
    console.error(error)
  }
}

export { signupPopup }
