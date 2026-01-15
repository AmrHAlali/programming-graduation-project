import { AVAILABLE_LANGUAGES, useAppStore } from "@/core";
import { useState } from "react";
import { BottomSheetSelect } from "./bottom-sheet-select";
import { Language } from "@/core/i18n/resources";

export const LanguageBottomSheet = ({ isVisible, setIsVisible }: { isVisible: boolean, setIsVisible: (v: boolean) => void }) => {
    const { setAppLanguage } = useAppStore();
    const [search, setSearch] = useState("");

    return (
        <BottomSheetSelect
            data={AVAILABLE_LANGUAGES}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            search={search}
            setSearch={setSearch}
            placeholder="Select Language"
            onSelect={(value) => {
                console.log(value);
                setAppLanguage(value as Language);
                setIsVisible(false);
            }}
        />
    );
};
