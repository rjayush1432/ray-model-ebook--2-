"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronDown, CheckCircle, XCircle, ArrowRight, Menu, X } from "lucide-react"

export default function RayModelEbook() {
  const [currentSection, setCurrentSection] = useState(0)
  const [mcqAnswers, setMcqAnswers] = useState<{ [key: number]: number }>({})
  const [showResults, setShowResults] = useState<{ [key: number]: boolean }>({})
  const [showNavigation, setShowNavigation] = useState(false)

  const sections = [
    { id: "cover", title: "Cover" },
    { id: "objectives", title: "Objectives" },
    { id: "introduction", title: "Introduction" },
    { id: "ray-model", title: "Ray Model" },
    { id: "plane-mirrors", title: "Plane Mirrors" },
    { id: "pinhole-cameras", title: "Pinhole Cameras" },
    { id: "mcq1", title: "Quiz 1" },
    { id: "mcq2", title: "Quiz 2" },
    { id: "mcq3", title: "Quiz 3" },
  ]

  const mcqQuestions = [
    {
      question: "What is the ray model of light?",
      options: [
        "Light travels in curved paths",
        "Light travels in straight lines called rays",
        "Light travels in circular motions",
        "Light doesn't travel at all",
      ],
      correct: 1,
    },
    {
      question: "What type of image is formed by a plane mirror?",
      options: ["Real and inverted", "Real and upright", "Virtual and inverted", "Virtual and upright"],
      correct: 3,
    },
    {
      question: "How does a pinhole camera work?",
      options: [
        "It uses lenses to focus light",
        "It uses mirrors to reflect light",
        "Light passes through a small hole to form an inverted image",
        "It doesn't work without electricity",
      ],
      correct: 2,
    },
  ]

  const scrollToSection = (index: number) => {
    const element = document.getElementById(`section-${index}`)
    element?.scrollIntoView({ behavior: "smooth" })
    setCurrentSection(index)
    setShowNavigation(false)
  }

  const handleMcqAnswer = (questionIndex: number, answerIndex: number) => {
    setMcqAnswers((prev) => ({ ...prev, [questionIndex]: answerIndex }))
    setShowResults((prev) => ({ ...prev, [questionIndex]: true }))
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((section, index) => {
        const element = document.getElementById(`section-${index}`)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(index)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="scroll-container relative">
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => setShowNavigation(!showNavigation)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full w-12 h-12 p-0 shadow-lg"
        >
          {showNavigation ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>

        {showNavigation && (
          <div className="absolute top-14 right-0 bg-card border border-border rounded-lg shadow-xl p-2 min-w-48 max-h-80 overflow-y-auto">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(index)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  currentSection === index
                    ? "bg-primary text-primary-foreground"
                    : "text-card-foreground hover:bg-muted"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="fixed top-0 left-0 right-0 z-40">
        <Progress
          value={(currentSection / (sections.length - 1)) * 100}
          className="h-1 rounded-none bg-background/50"
        />
      </div>

      {/* Cover Page */}
 <section
  id="section-0"
  className="ebook-section bg-gradient-to-br from-primary via-secondary to-primary geometric-pattern flex items-center justify-center p-4 sm:p-6 relative bg-cover bg-center"
  style={{ backgroundImage: "url('2.jpg')" }}
>
  <div className="text-center text-white max-w-sm sm:max-w-md w-full">
    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8">
      <h1 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4 text-balance leading-tight text-white">
        THE RAY MODEL OF LIGHT
      </h1>
      <p className="text-base sm:text-lg text-white text-pretty">
        Exploring how images form in plane mirrors
      </p>
    </div>

    <Button
      onClick={() => scrollToSection(1)}
      className="bg-white text-primary hover:bg-white/90 font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base shadow-lg"
    >
      Start Learning
      <ArrowRight className="ml-2 w-4 h-4" />
    </Button>

    <div className="mt-8 sm:mt-12 animate-bounce">
      <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 mx-auto text-white/70 drop-shadow-sm" />
    </div>
  </div>
</section>


      {/* Learning Objectives */}
      <section
        id="section-1"
        className="ebook-section bg-gradient-to-br from-secondary via-primary to-secondary geometric-pattern flex items-center justify-center p-4 sm:p-6"
      >
        <div className="max-w-sm sm:max-w-md w-full">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center items-center mb-4 sm:mb-6">
              <div className="w-6 sm:w-12 h-1 bg-white"></div>
              <h2 className="text-xl sm:text-3xl font-bold text-white mx-2 sm:mx-4 text-balance">TODAY, YOU WILL...</h2>
              <div className="w-6 sm:w-12 h-1 bg-white"></div>
            </div>

            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 sm:mb-6 relative">
              <div className="absolute inset-0 bg-white/20 rounded-full"></div>
              <div className="absolute top-1 left-1 sm:top-2 sm:left-2 w-8 h-8 bg-white/40 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {[
              "Explain the ray model of light",
              "Describe how plane mirrors form images using ray diagrams",
              "Draw ray diagrams",
              "Name the characteristics of images formed by plane mirrors",
              "Understand how pinhole cameras work",
            ].map((objective, index) => (
              <Card key={index} className="p-3 sm:p-4 bg-white/95 border-0 shadow-lg">
                <div className="flex items-center">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                  </div>
                  <p className="text-foreground font-medium text-sm sm:text-base text-pretty leading-relaxed">
                    {objective}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <Button
              onClick={() => scrollToSection(2)}
              className="bg-white text-primary hover:bg-white/90 font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base"
            >
              Continue
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="flex justify-end mt-6 sm:mt-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 relative">
              <div className="absolute inset-0 border-2 sm:border-4 border-white/30 rounded-full"></div>
              <div className="absolute top-1 left-1 sm:top-2 sm:left-2 w-10 h-10 sm:w-12 sm:h-12 border-2 sm:border-4 border-white/50 rounded-full"></div>
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 w-8 h-8 border-2 sm:border-4 border-white/70 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

{/* Introduction Section */}
<section
  id="section-2"
  className="ebook-section bg-background flex items-center justify-center p-4 sm:p-6"
>
  <div className="max-w-xl sm:max-w-2xl w-full">
    <div className="text-center mb-6 sm:mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4">
        Introduction to Light
      </h2>
      <div className="w-16 sm:w-24 h-1 bg-secondary mx-auto"></div>
    </div>

    {/* Autoplaying Loop Video */}
    <div className="text-center mb-6">
      <video
        src="/4.mp4" // put your animation file in public/ folder
        autoPlay
        loop
        muted
        playsInline
        className="w-full max-w-md mx-auto rounded-lg shadow-lg"
      />
    </div>

    <Card className="p-4 sm:p-8 bg-card border-2 border-primary/20">
      <div className="prose prose-sm sm:prose-lg max-w-none">
        <p className="text-card-foreground leading-relaxed mb-4 sm:mb-6 text-pretty">
          Light is one of the most fascinating phenomena in physics. To
          understand how we see objects and how images are formed, we need to
          explore the fundamental behavior of light.
        </p>

        <div className="bg-primary/10 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2 sm:mb-3">
            Key Concept
          </h3>
          <p className="text-card-foreground text-pretty">
            The ray model of light helps us understand and predict how light
            behaves when it interacts with mirrors, lenses, and other optical
            devices.
          </p>
        </div>

        <p className="text-card-foreground leading-relaxed text-pretty">
          In this chapter, we'll discover how light travels, how mirrors create
          images, and how simple devices like pinhole cameras work using these
          fundamental principles.
        </p>
      </div>
    </Card>

<div className="text-center my-6">
  <Card className="p-4 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300">
    <video
      src="/sim.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
    />
    <p className="text-sm text-gray-600 mt-2 italic">
      When you realize light is faster than your WiFi! 💡
    </p>
  </Card>
</div>


    <div className="text-center mt-6 sm:mt-8">
      <Button
        onClick={() => scrollToSection(3)}
        className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base shadow-lg"
      >
        Learn About Ray Model
        <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </div>
  </div>
</section>


      {/* Ray Model Section */}
      <section id="section-3" className="ebook-section bg-background flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-xl sm:max-w-2xl w-full">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4">The Ray Model of Light</h2>
            <div className="w-16 sm:w-24 h-1 bg-secondary mx-auto"></div>
          </div>

<div className="text-center mb-6">
      <video
        src="/5.mp4" // put your animation file in public/ folder
        autoPlay
        loop
        muted
        playsInline
        className="w-full max-w-md mx-auto rounded-lg shadow-lg"
      />
    </div>

          <div className="space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-8 bg-card border-2 border-primary/20">
              <h3 className="text-lg sm:text-xl font-semibold text-primary mb-3 sm:mb-4">What is the Ray Model?</h3>
              <p className="text-card-foreground leading-relaxed mb-3 sm:mb-4 text-pretty">
                The ray model is a simplified way to understand light behavior. In this model, we represent light as
                straight lines called rays that show the direction light travels.
              </p>

              <div className="bg-secondary/20 p-3 sm:p-4 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Key Principles:</h4>
                <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-card-foreground text-sm sm:text-base">
                  <li>Light travels in straight lines in uniform media</li>
                  <li>Light rays are independent of each other</li>
                  <li>Light rays can be reflected, refracted, or absorbed</li>
                </ul>
              </div>
            </Card>

            <Card className="p-4 sm:p-8 bg-card border-2 border-secondary/20">
              <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-3 sm:mb-4">Applications</h3>
              <p className="text-card-foreground leading-relaxed text-pretty">
                The ray model helps us understand how mirrors work, why shadows form, and how optical instruments like
                cameras and telescopes function.
              </p>
            </Card>
          </div>

          <div className="text-center my-6">
            <Card className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-300">
              <img
                src="/meme-about-drawing-straight-lines-physics-student-.gif"
                alt="Meme about drawing straight lines in physics"
                className="w-full max-w-sm mx-auto rounded-lg"
              />
              <p className="text-sm text-gray-600 mt-2 italic">
                Physics teachers: "Just draw straight lines!" Me: 📏✏️😅
              </p>
            </Card>
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <Button
              onClick={() => scrollToSection(4)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base"
            >
              Explore Plane Mirrors
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Plane Mirrors Section */}
      <section id="section-4" className="ebook-section bg-background flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-xl sm:max-w-2xl w-full">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4">Plane Mirrors</h2>
            <div className="w-16 sm:w-24 h-1 bg-secondary mx-auto"></div>
          </div>

          <div className="text-center mb-6">
            <img
              src="/animated-gif-showing-light-rays-reflecting-off-pla.jpg"
              alt="Light rays reflecting off plane mirror animation"
              className="w-full max-w-lg mx-auto rounded-lg shadow-lg border-2 border-primary/20"
            />
          </div>

          <div className="space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-8 bg-card border-2 border-primary/20">
              <h3 className="text-lg sm:text-xl font-semibold text-primary mb-3 sm:mb-4">
                How Plane Mirrors Form Images
              </h3>
              <p className="text-card-foreground leading-relaxed mb-3 sm:mb-4 text-pretty">
                When light rays from an object hit a plane mirror, they reflect according to the law of reflection: the
                angle of incidence equals the angle of reflection.
              </p>

              <div className="bg-primary/10 p-3 sm:p-4 rounded-lg mb-3 sm:mb-4">
                <h4 className="font-semibold text-primary mb-2">Image Characteristics:</h4>
                <ul className="list-disc list-inside space-y-1 text-card-foreground text-sm sm:text-base">
                  <li>Virtual (cannot be projected on a screen)</li>
                  <li>Upright (same orientation as object)</li>
                  <li>Same size as the object</li>
                  <li>Same distance behind mirror as object is in front</li>
                  <li>Laterally inverted (left-right reversed)</li>
                </ul>
              </div>
            </Card>

            <Card className="p-4 sm:p-8 bg-card border-2 border-secondary/20">
              <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-3 sm:mb-4">Ray Diagrams</h3>
              <p className="text-card-foreground leading-relaxed text-pretty">
                To locate an image in a plane mirror, we draw at least two rays from a point on the object. Where the
                reflected rays appear to meet behind the mirror is where the image forms.
              </p>
            </Card>
          </div>

          <div className="text-center my-6">
            <Card className="p-4 bg-gradient-to-r from-pink-100 to-red-100 border-2 border-pink-300">
              <img
                src="/funny-meme-about-mirror-selfies-and-lateral-invers.gif"
                alt="Meme about mirror selfies and physics"
                className="w-full max-w-sm mx-auto rounded-lg"
              />
              <p className="text-sm text-gray-600 mt-2 italic">
                When you realize your mirror selfie is laterally inverted! 🤳🔄
              </p>
            </Card>
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <Button
              onClick={() => scrollToSection(5)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base"
            >
              Learn About Pinhole Cameras
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Pinhole Cameras Section */}
      <section id="section-5" className="ebook-section bg-background flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-xl sm:max-w-2xl w-full">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4">Pinhole Cameras</h2>
            <div className="w-16 sm:w-24 h-1 bg-secondary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <img
              src="/pinhole-camera-diagram-showing-light-rays-passing-.jpg"
              alt="Pinhole camera diagram"
              className="w-full rounded-lg shadow-lg border-2 border-primary/20"
            />
            <img
              src="/real-pinhole-camera-photograph-showing-inverted-im.jpg"
              alt="Real pinhole camera photograph"
              className="w-full rounded-lg shadow-lg border-2 border-secondary/20"
            />
          </div>

          <div className="space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-8 bg-card border-2 border-primary/20">
              <h3 className="text-lg sm:text-xl font-semibold text-card-foreground mb-4 sm:mb-6 text-pretty">
                How They Work
              </h3>
              <p className="text-card-foreground leading-relaxed mb-3 sm:mb-4 text-pretty">
                A pinhole camera is the simplest type of camera. It consists of a light-tight box with a small hole on
                one side and a screen (like photographic film) on the opposite side.
              </p>

              <div className="bg-secondary/20 p-3 sm:p-4 rounded-lg mb-3 sm:mb-4">
                <h4 className="font-semibold text-primary mb-2">Key Features:</h4>
                <ul className="list-disc list-inside space-y-1 text-card-foreground text-sm sm:text-base">
                  <li>No lenses required</li>
                  <li>Forms real, inverted images</li>
                  <li>Image size depends on distance from pinhole to screen</li>
                  <li>Smaller pinhole gives sharper but dimmer images</li>
                </ul>
              </div>
            </Card>

            <Card className="p-4 sm:p-8 bg-card border-2 border-secondary/20">
              <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-3 sm:mb-4">The Science Behind It</h3>
              <p className="text-card-foreground leading-relaxed text-pretty">
                Light from each point on the object travels in straight lines through the pinhole. Since light travels
                in straight lines, the image appears upside down on the screen - this is why pinhole camera images are
                inverted.
              </p>
            </Card>
          </div>

          <div className="text-center my-6">
            <Card className="p-4 bg-gradient-to-r from-green-100 to-teal-100 border-2 border-green-300">
              <img
                src="/funny-meme-about-pinhole-cameras-vs-modern-smartph.gif"
                alt="Meme about pinhole cameras vs smartphones"
                className="w-full max-w-sm mx-auto rounded-lg"
              />
              <p className="text-sm text-gray-600 mt-2 italic">
                Pinhole cameras: The original "no filter needed"! 📸✨
              </p>
            </Card>
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <Button
              onClick={() => scrollToSection(6)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base"
            >
              Test Your Knowledge
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* MCQ Sections */}
      {mcqQuestions.map((mcq, questionIndex) => (
        <section
          key={questionIndex}
          id={`section-${6 + questionIndex}`}
          className="ebook-section bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4 sm:p-6"
        >
          <div className="max-w-xl sm:max-w-2xl w-full">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4">
                Question {questionIndex + 1} of {mcqQuestions.length}
              </h2>
              <Progress
                value={((questionIndex + 1) / mcqQuestions.length) * 100}
                className="w-full max-w-xs sm:max-w-md mx-auto"
              />
            </div>

            <div className="text-center mb-6">
              {questionIndex === 0 && (
                <img
                  src="/light-rays-traveling-in-straight-lines-physics-qui.jpg"
                  alt="Light rays illustration for quiz"
                  className="w-full max-w-sm mx-auto rounded-lg shadow-md"
                />
              )}
              {questionIndex === 1 && (
                <img
                  src="/plane-mirror-showing-virtual-upright-image-physics.jpg"
                  alt="Plane mirror image formation for quiz"
                  className="w-full max-w-sm mx-auto rounded-lg shadow-md"
                />
              )}
              {questionIndex === 2 && (
                <img
                  src="/pinhole-camera-cross-section-showing-inverted-imag.jpg"
                  alt="Pinhole camera diagram for quiz"
                  className="w-full max-w-sm mx-auto rounded-lg shadow-md"
                />
              )}
            </div>

            <Card className="p-4 sm:p-8 bg-card border-2 border-primary/20">
              <h3 className="text-lg sm:text-xl font-semibold text-card-foreground mb-4 sm:mb-6 text-pretty">
                {mcq.question}
              </h3>

              <div className="space-y-2 sm:space-y-3">
                {mcq.options.map((option, optionIndex) => {
                  const isSelected = mcqAnswers[questionIndex] === optionIndex
                  const isCorrect = optionIndex === mcq.correct
                  const showResult = showResults[questionIndex]

                  let buttonClass =
                    "w-full p-3 sm:p-4 text-left border-2 rounded-lg transition-all duration-200 text-sm sm:text-base "

                  if (showResult) {
                    if (isCorrect) {
                      buttonClass += "bg-green-100 border-green-500 text-green-800"
                    } else if (isSelected && !isCorrect) {
                      buttonClass += "bg-red-100 border-red-500 text-red-800"
                    } else {
                      buttonClass += "bg-muted border-border text-muted-foreground"
                    }
                  } else {
                    buttonClass += isSelected
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border text-card-foreground hover:bg-primary/10 hover:border-primary/50"
                  }

                  return (
                    <button
                      key={optionIndex}
                      onClick={() => !showResults[questionIndex] && handleMcqAnswer(questionIndex, optionIndex)}
                      className={buttonClass}
                      disabled={showResults[questionIndex]}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-pretty leading-relaxed">{option}</span>
                        {showResult && (
                          <div className="ml-2 flex-shrink-0">
                            {isCorrect ? (
                              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                            ) : isSelected ? (
                              <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                            ) : null}
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {showResults[questionIndex] && (
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-primary/10 rounded-lg">
                  <p className="text-card-foreground text-pretty text-sm sm:text-base">
                    {mcqAnswers[questionIndex] === mcq.correct
                      ? "Correct! Well done."
                      : `Incorrect. The correct answer is: ${mcq.options[mcq.correct]}`}
                  </p>
                </div>
              )}
            </Card>

            {showResults[questionIndex] && mcqAnswers[questionIndex] === mcq.correct && (
              <div className="text-center mt-4">
                <Card className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300">
                  <img
                    src="/celebration-meme-physics-student-getting-answer-ri.gif"
                    alt="Success celebration meme"
                    className="w-32 mx-auto rounded-lg"
                  />
                  <p className="text-sm text-green-700 mt-2 font-semibold">Physics genius mode: ACTIVATED! 🧠⚡</p>
                </Card>
              </div>
            )}

            {showResults[questionIndex] && questionIndex < mcqQuestions.length - 1 && (
              <div className="text-center mt-6 sm:mt-8">
                <Button
                  onClick={() => scrollToSection(7 + questionIndex)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base"
                >
                  Next Question
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            )}

            {showResults[questionIndex] && questionIndex === mcqQuestions.length - 1 && (
              <div className="text-center mt-6 sm:mt-8">
                <div className="p-4 sm:p-6 bg-secondary/20 rounded-lg">
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">Congratulations!</h3>
                  <p className="text-card-foreground text-pretty text-sm sm:text-base mb-4">
                    You've completed the Ray Model of Light e-book. Great job learning about light, mirrors, and pinhole
                    cameras!
                  </p>
                  <img
                    src="/physics-graduation-celebration-student-with-diplom.jpg"
                    alt="Physics completion celebration"
                    className="w-full max-w-sm mx-auto rounded-lg mt-4"
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
