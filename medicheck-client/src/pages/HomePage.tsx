import Contact from "./Contact"
import Disclaimer from "./Disclaimer"
import Features from "./Features"
import Hero from "./Hero"

export default function HomePage() {
    return (
        <div className="bg-primary">
            <Hero />
            <Features />
            <Disclaimer />
            <Contact />
        </div>
    )
}