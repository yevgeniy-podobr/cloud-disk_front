import React, { Dispatch, SetStateAction } from 'react'

export function useStateWithDep<T>(
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = React.useState(defaultValue)

  React.useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return [value, setValue]
}
