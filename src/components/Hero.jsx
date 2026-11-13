import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardPreview from './DashboardPreview.jsx'
import { usePrefersReducedMotion } from '../hooks/useDashboardAnimation.js'

const roleTaglines = {
  teacher: ['Teach smarter. Track better.', 'Your teaching, organized.'],
  student: ['Learn better. Stay on track.', 'Your progress, clearly tracked.'],
}

const benefitCards = [
  {
    role: 'teacher',
    title: 'For Teachers',
    description: 'Manage classes, sessions and student progress.',
  },
  {
    role: 'student',
    title: 'For Students',
    description: 'Track subjects, homework and learning progress.',
  },
]

function HeroTagline({ role, prefersReducedMotion }) {
  const [typedText, setTypedText] = useState('')

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined
    }

    const taglines = roleTaglines[role]
    let timeoutId
    let taglineIndex = 0
    let characterIndex = 0
    let isDeleting = false

    const typeNextCharacter = () => {
      const currentTagline = taglines[taglineIndex]

      if (isDeleting) {
        characterIndex -= 1
        setTypedText(currentTagline.slice(0, characterIndex))

        if (characterIndex === 0) {
          isDeleting = false
          taglineIndex = (taglineIndex + 1) % taglines.length
          timeoutId = window.setTimeout(typeNextCharacter, 360)
          return
        }

        timeoutId = window.setTimeout(typeNextCharacter, 32)
        return
      }

      characterIndex += 1
      setTypedText(currentTagline.slice(0, characterIndex))

      if (characterIndex === currentTagline.length) {
        isDeleting = true
        timeoutId = window.setTimeout(typeNextCharacter, 1500)
        return
      }

      timeoutId = window.setTimeout(typeNextCharacter, 54)
    }

    timeoutId = window.setTimeout(typeNextCharacter, 220)
    return () => window.clearTimeout(timeoutId)
  }, [role, prefersReducedMotion])

  const text = prefersReducedMotion ? roleTaglines[role][0] : typedText

  return (
    <p className="mt-4 min-h-[2.5em] text-2xl font-semibold leading-tight text-indigo-600 sm:min-h-[1.4em] sm:text-[30px] lg:text-[32px]">
      <span aria-hidden="true">{text}</span>
      <span className="typewriter-cursor" aria-hidden="true" />
      <span className="sr-only">{roleTaglines[role][0]}</span>
    </p>
  )
}

function Hero() {
  const [activeRole, setActiveRole] = useState('teacher')
  const [manualAnimationKey, setManualAnimationKey] = useState(0)
  const [transitionMode, setTransitionMode] = useState('automatic')
  const prefersReducedMotion = usePrefersReducedMotion()
  const transitionDuration = transitionMode === 'manual' ? 560 : 750
  const transitionEasing =
    transitionMode === 'manual'
      ? 'cubic-bezier(0.22, 1, 0.36, 1)'
      : 'cubic-bezier(0.42, 0, 0.58, 1)'
  const taglineRef = useRef(null)
  const previousTaglineRoleRef = useRef(activeRole)
  const benefitCardRefs = useRef(new Map())
  const benefitAnimationsRef = useRef(new Map())
  const previousBenefitRectsRef = useRef(new Map())
  const setTeacherCardRef = useCallback((element) => {
    if (element) {
      benefitCardRefs.current.set('teacher', element)
    } else {
      benefitCardRefs.current.delete('teacher')
    }
  }, [])
  const setStudentCardRef = useCallback((element) => {
    if (element) {
      benefitCardRefs.current.set('student', element)
    } else {
      benefitCardRefs.current.delete('student')
    }
  }, [])
  const handleRoleChange = useCallback(
    (role, source) => {
      if (role !== activeRole) {
        previousBenefitRectsRef.current = new Map(
          [...benefitCardRefs.current].map(([cardRole, element]) => [
            cardRole,
            element.getBoundingClientRect(),
          ]),
        )
        setTransitionMode(source)
        setActiveRole(role)
        if (source === 'manual') {
          setManualAnimationKey((currentKey) => currentKey + 1)
        }
      }
    },
    [activeRole],
  )

  useEffect(() => {
    const finishBenefitAnimations = () => {
      for (const animation of benefitAnimationsRef.current.values()) {
        if (animation.playState !== 'finished') {
          animation.finish()
        }
      }

      benefitAnimationsRef.current.clear()
      previousBenefitRectsRef.current.clear()
    }

    window.addEventListener('resize', finishBenefitAnimations)
    return () => window.removeEventListener('resize', finishBenefitAnimations)
  }, [])

  useLayoutEffect(() => {
    const roleChanged = previousTaglineRoleRef.current !== activeRole
    previousTaglineRoleRef.current = activeRole

    const tagline = taglineRef.current
    if (!roleChanged || !tagline || prefersReducedMotion) {
      return undefined
    }

    const isManualTransition = transitionMode === 'manual'
    const animation = tagline.animate(
      [
        {
          opacity: isManualTransition ? 0.82 : 0.92,
          transform: `translateY(${isManualTransition ? 4 : 2}px)`,
        },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      {
        duration: transitionDuration,
        easing: transitionEasing,
      },
    )

    return () => animation.cancel()
  }, [
    activeRole,
    prefersReducedMotion,
    transitionDuration,
    transitionEasing,
    transitionMode,
  ])

  useLayoutEffect(() => {
    const previousRects = previousBenefitRectsRef.current
    const animations = new Map()

    if (!prefersReducedMotion) {
      for (const [role, element] of benefitCardRefs.current) {
        const previousRect = previousRects.get(role)
        if (!previousRect || typeof element.animate !== 'function') {
          continue
        }

        const currentRect = element.getBoundingClientRect()
        const deltaX = previousRect.left - currentRect.left
        const deltaY = previousRect.top - currentRect.top

        if (deltaX !== 0 || deltaY !== 0) {
          const isManualTransition = transitionMode === 'manual'
          const animation = element.animate(
            [
              {
                opacity: isManualTransition ? 0.9 : 0.96,
                transform: isManualTransition
                  ? `translate(${deltaX}px, ${deltaY}px) scale(0.99)`
                  : `translate(${deltaX}px, ${deltaY}px)`,
              },
              {
                opacity: 1,
                transform: isManualTransition
                  ? 'translate(0, 0) scale(1)'
                  : 'translate(0, 0)',
              },
            ],
            {
              duration: transitionDuration,
              easing: transitionEasing,
            },
          )
          animations.set(role, animation)
        }
      }
    }

    previousBenefitRectsRef.current = new Map()
    benefitAnimationsRef.current = animations

    return () => {
      for (const animation of benefitAnimationsRef.current.values()) {
        animation.cancel()
      }
      benefitAnimationsRef.current.clear()
    }
  }, [
    activeRole,
    prefersReducedMotion,
    transitionDuration,
    transitionEasing,
    transitionMode,
  ])

  return (
    <section className="bg-[#faf9f6]">
      <div className="mx-auto grid w-[calc(100%_-_2rem)] max-w-[1440px] gap-12 py-16 sm:w-[93%] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:py-20">
        <div className="min-w-0">
          <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
            TutorTrack
          </span>
          <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Teaching and learning, finally in sync.
          </h1>
          <div ref={taglineRef}>
            <HeroTagline
              key={`${activeRole}-${prefersReducedMotion}`}
              role={activeRole}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            One connected workspace for teachers and students. Manage classes,
            follow progress and stay on top of learning.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              Get started
            </Link>
            <Link
              to="/login"
              className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
            >
              Log in
            </Link>
          </div>

          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
            {benefitCards.map((card) => (
              <div
                key={card.role}
                ref={card.role === 'teacher' ? setTeacherCardRef : setStudentCardRef}
                className={`rounded-2xl border border-slate-200 bg-white/80 p-4 ${
                  activeRole === card.role ? 'order-1' : 'order-2'
                }`}
              >
                <p className="text-sm font-semibold text-slate-900">{card.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <DashboardPreview
          activeRole={activeRole}
          transitionMode={transitionMode}
          transitionDuration={transitionDuration}
          transitionEasing={transitionEasing}
          onRoleChange={handleRoleChange}
          manualAnimationKey={manualAnimationKey}
        />
      </div>
    </section>
  )
}

export default Hero
