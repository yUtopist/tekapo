import { charPopper } from './scripts/charPopper.js'
import { objectFader } from './scripts/objectFader.js'

const REPO_URL = 'https://github.com/yUtopist/tekapo'
console.log('Hello World!')
console.log(`Please feel free to look around my repo.\n${REPO_URL}`)

window.addEventListener('load', () => {
  const hero = document.querySelector('#hero')

  // At the start lets add the letters popping on mouse over effect. We do it
  // here, so we can be sure that DOM is loaded and we can query it.
  const heroHeadings = Array.from(hero.children) // will return list of headings
  heroHeadings.forEach(heading => charPopper(heading)) // add effect to headings

  /* ======================== HERO SECTION ANIMATION ======================== */
  // First and Last names should animate in order, here we can have a list of
  // DOM elements, that we then combine in to one string, that can be used with
  // querySelectorAll.
  const orderedElementsList = [
    '#hero__name span',
    '#hero__surname span'
  ].join(', ')
  const orderedElements = Array.from(hero.querySelectorAll(orderedElementsList))

  // Lets also have a list of elements that we want to animate in random order.
  const randomElementsList = [
    '#hero__position span',
    '#hero__statement span',
  ].join(', ')
  const randomElements = Array.from(hero.querySelectorAll(randomElementsList))
  
  // We made document's body hiding all elements, so we can fade them in later.
  // While body is still hidden, lets hide individual elements as well, and then
  // remove loading state from body, so we can fade in elements.
  orderedElements.forEach(element => element.dataset.hidden = 'true')
  randomElements.forEach(element => element.dataset.hidden = 'true')
  document.body.dataset.loading = "false"

  const orderedOptions = {
    delay: 0,
    interval: 30,
    type: 'ordered',
    id: 'fullname'
  }

  const randomOptions = {
    delay: 300,
    interval: 30,
    type: 'random',
    id: 'random'
  }

  // Ok, a little bit of an insanity happening here. We want to trigger an event
  // when we are done with fading in ordered elements, so we can start fading in
  // random elements. We can do this by adding an event listener to document,
  // that will trigger an event when we are done with fading in ordered elements
  // and then we can start fading in random elements.

  // Lets add an event listener to document, and we have to do it prier to 
  // calling objectFader, so we can be sure that event listener is in place.
  document.addEventListener(
    'completedfader' + orderedOptions.id,
    () => objectFader(randomElements, randomOptions))

  objectFader(orderedElements, orderedOptions)
  /* ======================================================================== */
})