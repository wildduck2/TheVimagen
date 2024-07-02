import { Icon } from '@/assets'

export const AuthSide = () => {
  return (
    <>
      <aside className="auth__aside">
        <div className="layout" />

        <div className="top">
          The
          <Icon.vim className="size-[40px]" />
          agen
        </div>

        <div className="quote">
          <blockquote>
            <p>
              &ldquo;Don't be fooled by the calendar. There are only as many days in the year as you make use of. One
              man gets only a week's value out of a year while another man gets a full year's value out of a
              week.&rdquo;
            </p>
            <footer>
              <img
                src="https://media.licdn.com/dms/image/C4D03AQEVq6auQMUjGA/profile-displayphoto-shrink_800_800/0/1610015961660?e=2147483647&v=beta&t=rmpXaqvBRpeK-TTsRFhbuhF-PyTwlmwW31YNwSbnMBY"
                width={40}
                className="rounded-full"
                alt=""
              />
              Sofia Davis
            </footer>
          </blockquote>
        </div>
      </aside>
    </>
  )
}
