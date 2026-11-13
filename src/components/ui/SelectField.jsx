import { useEffect, useRef, useState } from 'react'

export default function SelectField({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  options,
  required = true,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const listId = `${id}-options`
  const selectedIndex = options.findIndex((option) => option.value === value)
  const selectedOption = options[selectedIndex]
  const filteredOptions = query
    ? options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase()),
      )
    : options
  const activeOption = filteredOptions[activeIndex]

  useEffect(() => {
    inputRef.current?.setCustomValidity(
      required && !value ? `Select ${label.toLowerCase()}.` : '',
    )
  }, [label, required, value])

  const openList = () => {
    setQuery('')
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0)
    setIsOpen(true)
  }

  const closeList = () => {
    setIsOpen(false)
    setQuery('')
  }

  const selectOption = (option) => {
    onChange({ target: { name, value: option.value } })
    inputRef.current?.setCustomValidity('')
    closeList()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!isOpen) {
        openList()
      } else {
        setActiveIndex((index) =>
          Math.min(index + 1, filteredOptions.length - 1),
        )
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!isOpen) {
        openList()
      } else {
        setActiveIndex((index) => Math.max(index - 1, 0))
      }
    } else if (event.key === 'Enter' && isOpen && activeOption) {
      event.preventDefault()
      selectOption(activeOption)
    } else if (event.key === 'Escape' && isOpen) {
      event.preventDefault()
      closeList()
    }
  }

  return (
    <div
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          closeList()
        }
      }}
    >
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <div className="relative mt-2">
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="text"
          role="combobox"
          autoComplete="off"
          value={isOpen ? query : selectedOption?.label ?? ''}
          placeholder={placeholder}
          onChange={(event) => {
            setQuery(event.target.value)
            setActiveIndex(0)
            setIsOpen(true)
          }}
          onClick={() => {
            if (!isOpen) openList()
          }}
          onKeyDown={handleKeyDown}
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listId : undefined}
          aria-activedescendant={
            isOpen && activeOption ? `${id}-option-${activeIndex}` : undefined
          }
          aria-required={required}
          required={required}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-11 text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <path d="m7 10 5 5 5-5" />
        </svg>

        {isOpen && (
          <ul
            id={listId}
            role="listbox"
            aria-label={label}
            className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-900/10"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                const isSelected = option.value === value
                const isActive = index === activeIndex

                return (
                  <li
                    key={option.value}
                    id={`${id}-option-${index}`}
                    role="option"
                    aria-selected={isSelected}
                    className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      isSelected || isActive
                        ? 'bg-indigo-50 font-medium text-indigo-700'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                    onMouseDown={(event) => event.preventDefault()}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => selectOption(option)}
                  >
                    {option.label}
                    {isSelected && (
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-3 h-4 w-4 shrink-0"
                      >
                        <path d="m5 12 4 4L19 6" />
                      </svg>
                    )}
                  </li>
                )
              })
            ) : (
              <li
                role="option"
                aria-disabled="true"
                aria-selected="false"
                className="px-3 py-2.5 text-sm text-slate-500"
              >
                No matching options
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}
