import { colors } from "../theme";
import { Rank } from "../types/ranking";
import { BronzeRankSVG } from "@/components/ui/svg/ranks-avatar/bronze";
import { ChallengerRankSVG } from "@/components/ui/svg/ranks-avatar/challenger";
import { DiamondRankSVG } from "@/components/ui/svg/ranks-avatar/diamond";
import { EmeraldRankSVG } from "@/components/ui/svg/ranks-avatar/emerald";
import { GoldRankSVG } from "@/components/ui/svg/ranks-avatar/gold";
import { GrandmasterRankSVG } from "@/components/ui/svg/ranks-avatar/grand-master";
import { IronRankSVG } from "@/components/ui/svg/ranks-avatar/iron";
import { MasterRankSVG } from "@/components/ui/svg/ranks-avatar/master";
import { PlatinumRankSVG } from "@/components/ui/svg/ranks-avatar/platinum";
import { SilverRankSVG } from "@/components/ui/svg/ranks-avatar/silver";

export const rankColors: Record<Rank, { bg: string; text: string }> = {
    [Rank.Iron]: colors.ranks.iron,
    [Rank.Bronze]: colors.ranks.bronze,
    [Rank.Silver]: colors.ranks.silver,
    [Rank.Gold]: colors.ranks.gold,
    [Rank.Platinum]: colors.ranks.platinum,
    [Rank.Emerald]: colors.ranks.emerald,
    [Rank.Diamond]: colors.ranks.diamond,
    [Rank.Master]: colors.ranks.master,
    [Rank.Grandmaster]: colors.ranks.grandmaster,
    [Rank.Challenger]: colors.ranks.challenger,
};

export const rankAvatars: Record<Rank, React.FC<{ width?: number; height?: number, color?: string }>> = {
    [Rank.Iron]: IronRankSVG,
    [Rank.Bronze]: BronzeRankSVG,
    [Rank.Silver]: SilverRankSVG,
    [Rank.Gold]: GoldRankSVG,
    [Rank.Platinum]: PlatinumRankSVG,
    [Rank.Emerald]: EmeraldRankSVG,
    [Rank.Diamond]: DiamondRankSVG,
    [Rank.Master]: MasterRankSVG,
    [Rank.Grandmaster]: GrandmasterRankSVG,
    [Rank.Challenger]: ChallengerRankSVG,
};

export function getRankColors(rank: Rank) {
    return rankColors[rank];
}
