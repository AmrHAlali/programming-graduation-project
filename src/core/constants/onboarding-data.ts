import { onboardingDataProps } from "../types/onboarding-types";
import { imgRegistry } from "../utils";

export const OnboardingData : onboardingDataProps[] = [
    {
        title: "Discover New Features",
        subtitle: "Welcome to our app! Discover new features and functionalities designed to enhance your experience.",
        buttonText: "Next",
        image: imgRegistry.discover
    },
    {
        title: "Stay Connected",
        subtitle: "Stay connected with friends and family through our seamless communication tools.",
        buttonText: "Next",
        image: imgRegistry.connected
    },
    {
        title: "Personalized Recommendations",
        subtitle: "Explore personalized recommendations and curated content tailored just for you.",
        buttonText: "Finish",
        image: imgRegistry.customization
    }
]