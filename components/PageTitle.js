import { RoughNotation } from 'react-rough-notation'

export default function PageTitle({ children }) {
  return (
    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
      <RoughNotation
        animate="true"
        type="underline"
        show={true}
        color="#f44336"
        animationDelay={1000}
        animationDuration={2500}
        className="text-slate-200"
      >
        {children}
      </RoughNotation>
    </h1>
  )
}
