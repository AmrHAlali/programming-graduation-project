import { Button, Screen, Text } from "@/components";
import { colors, hp, useUserStore, wp } from "@/core";
import { useGetCompetitionQuestions } from "@/core/hooks/competitions/use-competition-questions";
import { useSubmitCompetitionAnswers } from "@/core/hooks/competitions/use-submit-competition-answers";
import { SharedStackParamList } from "@/screens/navigation/shared-stack-navigator";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export const AttemptingCompetitionScreen = () => {
    const route = useRoute<RouteProp<SharedStackParamList, "AttemptingCompetition">>();
    const params = route.params;
    const { competitionQuestions } = useGetCompetitionQuestions({ id: params.id });
    const username = useUserStore((state) => state.authDetails?.username);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number | null>>({});
    const { submitCompetitionAnswers, isPending } = useSubmitCompetitionAnswers();
    const navigation = useNavigation();

    const currentQuestion = competitionQuestions?.[questionIndex];

    const handleSelectOption = (questionId: number, optionId: number) => {
        setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    };

    const handleNext = () => {
        if (!competitionQuestions) return;
        if (questionIndex < competitionQuestions.length - 1) {
            setQuestionIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (questionIndex > 0) {
            setQuestionIndex((prev) => prev - 1);
        }
    };

    const handleSubmit = async () => {
        if (!competitionQuestions || !username) return;

        const formattedAnswers = Object.entries(answers)
            .filter(([, optionId]) => optionId != null)
            .map(([questionId, optionId]) => ({
                questionId: Number(questionId),
                selectedOptionId: optionId as number,
            }));
           try {
            await submitCompetitionAnswers({
                competitionId: params.id,
                username,
                answers: formattedAnswers,
            });
        } catch {
            // Errors (e.g., 403 already submitted) are handled in the hook
        } finally {
            navigation.goBack();
        }
    };

    return (
        <Screen safeAreaEdges={["top"]} preset="scroll" style={styles.container}>
            {currentQuestion && (
                <View style={styles.content}>
                    <Text preset="titleMediumBold" color={colors.primaryDeep}>
                        {currentQuestion.questionText}
                    </Text>

                    <View style={styles.optionsContainer}>
                        {currentQuestion.options.map((option) => {
                            const isSelected = answers[currentQuestion.id] === option.id;
                            return (
                                <TouchableOpacity
                                    key={option.id}
                                    activeOpacity={0.7}
                                    style={[
                                        styles.option,
                                        isSelected && styles.optionSelected,
                                    ]}
                                    onPress={() => handleSelectOption(currentQuestion.id, option.id)}
                               >
                                    <Text
                                        color={isSelected ? colors.background : colors.primaryDeep}
                                        preset="bodyMedium"
                                    >
                                        {option.optionText}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <View style={styles.footerActions}>
                        <Button
                            tx="Previous"
                            disabled={questionIndex === 0}
                            onPress={handlePrev}
                            style={{ flex: 1, opacity: questionIndex === 0 ? 0.5 : 1 }}
                        />

                        {questionIndex < (competitionQuestions?.length ?? 0) - 1 ? (
                            <Button
                                tx="Next"
                                onPress={handleNext}
                                style={{ flex: 1 }}
                            />
                        ) : (
                            <Button
                                tx="Submit"
                                onPress={handleSubmit}
                                disabled={isPending}
                                style={{ flex: 1, opacity: isPending ? 0.7 : 1 }}
                            />
                        )}
                    </View>
                </View>
            )}
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: hp(3),
        paddingHorizontal: wp(5),
        backgroundColor: colors.background,
    },
    content: {
        gap: hp(4),
        paddingBottom: hp(10),
    },
    optionsContainer: {
        gap: hp(2),
    },
    option: {
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(4),
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.primaryDeep,
    },
    optionSelected: {
        backgroundColor: colors.primaryDeep,
    },
    footerActions: {
        flexDirection: "row",
        gap: wp(4),
    },
});