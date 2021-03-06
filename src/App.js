import React, { useState, useEffect } from "react"
import queryString from "query-string"

import { Header } from "./components/header/index.js"
import { SearchBar } from "./components/search-bar/index.js"
import { MessageBar } from "./components/message-bar/index.js"
import { Content } from "./components/content/index.js"
import { Footer } from "./components/footer/index.js"

import { getGitHubContributions } from "./integrations/github.js"
import { isString, stringContainsValidCharacters } from "./util"

import "./App.css"

const Glimpse = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [canceled, setCanceled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showDemo, setShowDemo] = useState(true)
  const [input, setInput] = useState("")
  const [contributions, setContributions] = useState([])
  const [message, setMessage] = useState("Search any GitHub username for a glimpse at their open source contributions")
  const [logoStyling, setLogoStyling] = useState("app-logo")
  const [footerStyling, setFooterStyling] = useState("footer")

  const handleClick = async (username = input) => {
    const emptyInput = username === ""
    const inputNotAString = !isString(username)
    const inputHasInvalidCharacters = !stringContainsValidCharacters(username)

    if (emptyInput || inputNotAString || inputHasInvalidCharacters) {
      setContributions([])
      setLoading(false)
      setMessage("No GitHub contributions found")
      setShowDemo(true)
    } else {
      setContributions([])
      setCanceled(false)
      setShowDemo(false)
      setLoading(true)
      const contributions = await getGitHubContributions(username)
      setLoading(false)
      setMessage(`A glimpse at ${username}'s GitHub contributions`)
      setContributions(contributions)

      if (contributions === 0) {
        setMessage("No GitHub contributions found")
        setShowDemo(true)
      }
    }
  }

  const demo = async () => {
    setInput("cujarrett")
    handleClick("cujarrett")
  }

  const handleResize = () => {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    let logoStyling = "app-logo"
    let footerStyling = "footer"

    if (windowWidth < 400) {
      logoStyling = "app-logo-small-display"
    }
    if (windowHeight < 675 && windowWidth > 400) {
      footerStyling = "footer-small-display"
    }

    setWidth(.9 * window.innerWidth)
    setHeight(.5 * window.innerHeight - 20)
    setLogoStyling(logoStyling)
    setFooterStyling(footerStyling)
  }

  useEffect(() => {
    const urlArguments = queryString.parse(window.location.search)
    const username = urlArguments.username
    if (username) {
      const usernameIsString = isString(username)
      const usernameContainsValidCharacters = stringContainsValidCharacters(username)
      if (usernameIsString && usernameContainsValidCharacters) {
        setInput(username)
        handleClick(username)
      }
    }
    if (urlArguments) {
      window.history.pushState("", "Glimpse", "/")
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="main">
      <Header logoStyling={logoStyling}/>
      <SearchBar
        input={input}
        setInput={setInput}
        setContributions={setContributions}
        handleClick={handleClick}
        setLoading={setLoading}
        loading={loading}
        setCanceled={setCanceled} />
      <MessageBar message={message} />
      <Content
        width={width}
        height={height}
        loading={loading}
        showDemo={showDemo}
        contributions={contributions}
        input={input}
        setInput={setInput}
        handleClick={handleClick}
        demo={demo}
        canceled={canceled} />
      <Footer footerStyling={footerStyling}/>
    </div>
  )
}

export default Glimpse
