import { onMounted, onUnmounted, ref } from 'vue'

type IntersectionObserverConfig = {
  targetElId: string
  targetTopElementId?: string
  root?: HTMLElement | null
  rootMargin?: string
  threshold?: number
  callback: () => void
  secondCallback?: () => void
}
export const useIntersectionObserver = ({
  targetElId,
  targetTopElementId,
  root = null,
  rootMargin = '200px 0px',
  threshold = 0.1,
  callback,
  secondCallback,
}: IntersectionObserverConfig) => {
  const isIntersecting = ref(false)
  const isObserving = ref(false)

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    // DOM ready
    const target = document.getElementById(`${targetElId}`)
    const targetTopEl = document.getElementById(`${targetTopElementId}`)

    if (!target) {
      console.warn(`Element with id "${targetElId}" not found`)
      return
    }

    if (target) {
      isObserving.value = true
      observer = new IntersectionObserver(
        (entries) => {
          // biome-ignore lint/complexity/noForEach: <explanation>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              isIntersecting.value = true
              if (entry.target.id === 'sentinel-bottom') {
                callback()
              } else if (entry.target.id === 'sentinel-top' && secondCallback) {
                secondCallback()
              }
            }
          })
        },
        {
          root: root,
          rootMargin: rootMargin,
          threshold: threshold,
        },
      )

      observer.observe(target)
      if (targetTopEl) observer.observe(targetTopEl)
    }
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
      isObserving.value = false
    }
  })

  return { isIntersecting, isObserving }
}
