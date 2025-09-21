import { Translation, Translations } from '../types';

const enTranslations: Translation = {
  common: {
    title: "WGT Baseball",
    wgt: "WGT: {{count}}",
    returnToMain: "Return to Main",
    goBack: "Go Back",
    cancel: "Cancel",
    confirm: "Confirm",
    close: "Close",
    settings: "Settings",
    view: "View",
  },
  auth: {
    connecting: "Connecting to World App...",
    unverified: "Please verify your World ID in the World App to play.",
    error: "Could not connect to World App. Please try again later.",
  },
  main: {
    dailyChallenge: "Daily Challenge",
    practiceMode: "Practice Mode",
    play: "Play Now",
    remainingTime: "Resets in {{time}}",
    assets: "My Assets",
    referral: "Friend Referral",
    achievements: "Achievements",
    ranking: "Ranking",
  },
  game: {
    swing: "Swing!",
    giveUp: "Give Up",
    useHint: "Use Hint",
    hintCost: "({{count}} WGT)",
    inning: "Inning {{inning}}/{{max}}",
    dailyChallengeTitle: "Daily Challenge",
    practiceModeTitle: "Practice Mode",
    hit_short: "H",
    foul_short: "F",
    strike_short: "S",
  },
  commentary: {
    ready: "Step up to the plate!",
    need3Numbers: "You must select 3 numbers!",
    result: "{{hits}} Hits, {{fouls}} Fouls! Nice try!",
    strike: "Strike! Better luck next time!",
    homerun: "HOME RUN!!! A perfect hit!",
    hintUsed: "[Hint] The number '{{hint}}' is not included!",
    notEnoughWgt: "Not enough WGT!",
    noMoreHintInGame: "No more hints can be used in this game.",
    dynamic: {
      homerun: [
        "HOME RUN! It's over the fence! A perfect hit to end the game!",
        "A thrilling walk-off home run! Victory is yours!",
        "A three-run blast! You've completely demolished the pitcher!",
        "Today's highlight, right here! A fantastic home run!",
        "Accurate analysis, bold prediction! That's pure skill!"
      ],
      hit1: ["Nice hit! You got one right!", "One down, but a ways to go. Look forward to the next at-bat!", "A Hit! You've got a good clue.", "A crucial hit at a key moment! Stay calm and aim for the next one."],
      hit2: ["Multi-hit! Two numbers are in the exact right place!", "Fantastic swing! Almost a perfect hit!", "Two precise hits! Are you aiming for a home run next?", "The pitcher is starting to waver! This is your chance to push!"],
      foul1: ["So close! One number was a match, but not in the right spot!", "You found one number, but not its position. A little more focus!", "The direction was right, but it needed a bit more power! Let's try again!"],
      foul2: ["Two fouls! Two numbers are correct but misplaced. Very close!", "You see two of the numbers, but they're not in their spots! Try a new combination!", "The pitcher's throw was clever. You caught two numbers, but their positions are off!"],
      foul3: ["Three fouls! All three numbers are correct but in the wrong positions. Almost perfect, what a shame!", "All three numbers are there, hiding! But all their positions are off. Re-arrange your strategy!", "The pitcher is expertly dodging your hits! The three numbers are correct, but it's not a hit!"],
      strike: ["Strike! That swing completely missed!", "Unfortunately, you didn't hit anything. Aim for the next chance!", "The pitcher's experience shines through! You must choose the next pitch carefully.", "This at-bat ends in vain. Regroup for the next opportunity!"],
      strikeout: ["Strikeout! Unfortunately, you couldn't hit a home run in 9 innings. The game is over.", "Game over! Hope for a better result next time, and challenge again!", "That's all for today's game. But your passion doesn't end here! Prepare for the next match!"],
      hintUsed: ["Here's the report from the analyst! The number '{{hint}}' is not in the secret code.", "Good info! Think with the number '{{hint}}' excluded.", "A sign from the manager! '{{hint}}' is a discard."]
    }
  },
  modal: {
    giveUp: {
      title: "Are you sure you want to give up?",
      message: "Used hints cannot be returned, and their cost will be deducted.",
      messagePractice: "Do you want to quit the game?",
    },
    result: {
      homerun: "HOME RUN!",
      strikeout: "STRIKEOUT!",
      congrats: "Congratulations! You won!",
      nextTime: "Too bad. Better luck next time!",
      correctAnswer: "The correct number was:",
      totalWinnings: "Total Winnings (WGT)",
    },
    referral: {
        title: "Friend Referral",
        description: "Enter a friend's referral ID to get 10 WGT! They will also receive 10 WGT.",
        enterId: "Enter Referrer ID (Wallet Address)",
        claimBonus: "Claim Bonus",
        yourId: "Your Referral ID",
        copyId: "Copy ID",
        copied: "Copied!",
        invalidId: "Invalid ID. Please check the address.",
        alreadyClaimed: "You have already claimed a referral bonus!",
        claimSuccess: "Success! You and your friend received 10 WGT each."
    },
    settings: {
      title: "Settings",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      dusk: "Dusk",
      sakura: "Sakura",
    }
  },
  languageSelector: {
    title: "Select Language"
  },
  help: {
    title: "How to Play",
    objective: {
        title: "Game Objective",
        description: "Guess the 3 unique secret numbers created by the computer within 9 tries!",
    },
    results: {
        title: "How to Read Results",
        hit: "Hit: The number and its position are both correct.",
        foul: "Foul: The number exists, but in a different position.",
        strike: "Strike: None of the guessed numbers are in the secret code.",
        example: {
            answer: "Answer",
            guess: "Your Guess",
            result: "Result",
        },
    },
    currency: {
        title: "Currency Guide",
        wgt: "WGT: A utility token used for in-game hints. Earn it by winning Daily Challenges or through friend referrals.",
    },
    rewards: {
        title: "Daily Challenge Rewards",
        description: "The fewer tries it takes to hit a homerun, the bigger the reward!",
        inning: "Success in {{count}} tries",
        reward: "+{{reward}} WGT",
    },
  },
  achievements: {
    title: "Achievements",
    claimReward: "Claim Reward",
    claimed: "Claimed",
    firstHomerun: {
        title: "First Home Run!",
        description: "Successfully guess the number for the first time."
    },
    perfectGame: {
        title: "Perfect Game",
        description: "Guess the number on the very first try."
    },
    win100: {
        title: "Veteran Hitter",
        description: "Win 100 Daily Challenges."
    },
    perfectWeek: {
        title: "Hot Streak",
        description: "Win the Daily Challenge 7 days in a row."
    }
  },
  ranking: {
      title: "Weekly Ranking",
      timeLeft: "Season ends in {{time}}",
      minimumAttempts: "Avg. Attempts",
      mostHomeruns: "Total Home Runs",
      rank: "Rank",
      player: "Player",
      record: "Record",
      reward: "Reward",
      myRank: "My Rank: {{rank}}",
  },
};

const koTranslations: Translation = {
    common: {
      title: "WGT 베이스볼",
      wgt: "WGT: {{count}}",
      returnToMain: "메인으로 돌아가기",
      goBack: "뒤로가기",
      cancel: "취소",
      confirm: "확인",
      close: "닫기",
      settings: "설정",
      view: "보기",
    },
    auth: {
        connecting: "월드앱에 연결 중...",
        unverified: "플레이하려면 월드앱에서 월드 ID를 인증해주세요.",
        error: "월드앱에 연결할 수 없습니다. 나중에 다시 시도해주세요.",
    },
    main: {
      dailyChallenge: "오늘의 도전",
      practiceMode: "연습 모드",
      play: "플레이",
      remainingTime: "{{time}} 후 초기화",
      assets: "내 자산",
      referral: "친구 추천",
      achievements: "업적",
      ranking: "랭킹",
    },
    game: {
      swing: "타격!",
      giveUp: "포기하기",
      useHint: "힌트 사용",
      hintCost: "(WGT {{count}}개)",
      inning: "{{inning}} / {{max}}회",
      dailyChallengeTitle: "오늘의 도전",
      practiceModeTitle: "연습 모드",
      hit_short: "안타",
      foul_short: "파울",
      strike_short: "스",
    },
    commentary: {
      ready: "타석을 준비하세요!",
      need3Numbers: "숫자 3개를 모두 선택해야 합니다!",
      result: "{{hits}} 안타, {{fouls}} 파울! 좋은 시도입니다!",
      strike: "스트라이크! 다음 공을 노리세요!",
      homerun: "홈런!!! 완벽한 타격입니다!",
      hintUsed: "[힌트] 숫자 '{{hint}}'는 포함되지 않습니다!",
      notEnoughWgt: "WGT가 부족합니다!",
      noMoreHintInGame: "이번 게임에서는 더 이상 힌트를 사용할 수 없습니다.",
      dynamic: {
        homerun: ["홈런! 담장을 넘겼습니다! 완벽한 타격으로 경기를 끝냅니다!", "짜릿한 역전 홈런! 승리의 여신이 당신의 편이네요!", "쓰리런 홈런! 완벽하게 상대 투수를 무너뜨렸습니다!", "오늘의 하이라이트는 바로 이 장면입니다! 환상적인 홈런!", "정확한 분석, 대담한 예측! 이것이 바로 당신의 실력입니다!"],
        hit1: ["좋은 타격! 공 하나는 제대로 맞혔습니다!", "하나 맞혔지만, 아직 갈 길이 멉니다. 다음 타석을 기대하죠!", "안타! 좋은 힌트를 얻었군요.", "중요한 순간, 한 방을 날렸습니다! 침착하게 다음을 노려보세요."],
        hit2: ["멀티 히트! 두 개의 숫자는 정확한 위치에 있습니다!", "환상적인 타격! 거의 완벽한 안타였습니다!", "정확한 타구 두 개! 다음 타석에서 홈런을 노려볼까요?", "상대 투수가 흔들리기 시작합니다! 몰아붙일 기회예요!"],
        foul1: ["아깝습니다! 공 하나는 스쳤지만, 제대로 맞춰내지 못했네요!", "숫자 하나는 있었지만, 위치를 찾지 못했습니다. 조금 더 집중해야 합니다!", "방향은 맞았지만, 조금만 더 힘을 냈어야죠! 다시 노려봅시다!"],
        foul2: ["투 파울! 두 개의 공이 스쳐 지나갔습니다. 아주 아슬아슬하네요!", "두 개의 숫자가 보이지만, 제자리를 찾지 못했습니다! 다시 한번 조합해 보세요!", "투수의 공이 영리하네요. 두 개의 숫자를 잡았지만, 위치가 다릅니다!"],
        foul3: ["쓰리 파울! 세 개의 공이 모두 스쳐 지나갔습니다. 거의 완벽했지만, 아쉽네요!", "세 개의 숫자가 모두 숨어 있습니다! 하지만 위치는 모두 빗나갔습니다. 다시 한번 수를 놓아보시죠!", "상대 투수가 당신의 타구를 절묘하게 피해갑니다! 세 개의 숫자는 있었지만, 안타는 아닙니다!"],
        strike: ["스트라이크! 이번 타구는 완전히 빗나갔습니다!", "아쉽게도 아무것도 맞히지 못했습니다. 다시 기회를 노려보세요!", "투수의 노련함이 돋보입니다! 다음 투구는 신중하게 선택해야 합니다.", "현재 타석은 허무하게 돌아갑니다. 다음 기회를 위해 심기일전하세요!"],
        strikeout: ["삼진 아웃! 아쉽게도 9번의 타석에서 홈런을 치지 못했습니다. 경기는 종료됩니다.", "경기 종료! 다음 번에는 더 나은 결과를 기대하며, 다시 도전해 보세요!", "오늘의 경기는 여기까지입니다. 하지만 당신의 열정은 끝나지 않습니다! 다음 경기를 준비하세요!"],
        hintUsed: ["전력분석관의 리포트입니다! '{{hint}}'번 숫자는 비밀 숫자에 포함되어 있지 않습니다.", "좋은 정보입니다! 숫자 '{{hint}}'는 제외하고 생각하세요.", "감독의 사인! '{{hint}}'는 버리는 카드입니다."]
      }
    },
    modal: {
      giveUp: {
        title: "정말 포기하시겠습니까?",
        message: "사용한 힌트는 되돌려받을 수 없으며, 비용이 차감됩니다.",
        messagePractice: "게임을 포기하시겠습니까?",
      },
      result: {
        homerun: "홈런!",
        strikeout: "삼진 아웃!",
        congrats: "축하합니다! 승리했습니다!",
        nextTime: "아쉽네요. 다음 기회에!",
        correctAnswer: "정답은 다음과 같았습니다:",
        totalWinnings: "총 획득 (WGT)",
      },
      referral: {
        title: "친구 추천",
        description: "친구의 추천인 ID를 입력하고 10 WGT를 받으세요! 친구도 10 WGT를 받습니다.",
        enterId: "추천인 ID 입력 (지갑 주소)",
        claimBonus: "보너스 받기",
        yourId: "나의 추천인 ID",
        copyId: "ID 복사",
        copied: "복사됨!",
        invalidId: "잘못된 ID입니다. 주소를 확인해주세요.",
        alreadyClaimed: "이미 추천 보너스를 받았습니다!",
        claimSuccess: "성공! 당신과 친구분에게 각각 10 WGT가 지급되었습니다."
      },
      settings: {
        title: "설정",
        theme: "테마",
        light: "라이트",
        dark: "다크",
        dusk: "황혼",
        sakura: "벚꽃",
      }
    },
    languageSelector: {
      title: "언어 선택"
    },
    help: {
        title: "게임 방법",
        objective: {
            title: "게임 목표",
            description: "컴퓨터가 만든 3개의 서로 다른 비밀 숫자를 9번의 기회 안에 맞히세요!",
        },
        results: {
            title: "결과 판정 방법",
            hit: "안타 (Hit): 숫자와 위치가 모두 일치하는 경우.",
            foul: "파울 (Foul): 숫자는 있지만 위치가 다른 경우.",
            strike: "스트라이크 (Strike): 추리한 숫자가 하나도 포함되지 않은 경우.",
            example: {
                answer: "정답",
                guess: "내 추리",
                result: "결과",
            },
        },
        currency: {
            title: "게임 재화 안내",
            wgt: "WGT: 게임 내 힌트를 사용하는 데 필요한 유틸리티 토큰입니다. 오늘의 도전에서 승리하거나 친구 추천으로 획득하세요.",
        },
        rewards: {
            title: "오늘의 도전 보상",
            description: "더 적은 시도로 홈런을 칠수록 더 큰 보상을 받습니다!",
            inning: "{{count}}회 성공",
            reward: "+{{reward}} WGT",
        },
    },
    achievements: {
      title: "업적",
      claimReward: "보상 받기",
      claimed: "획득 완료",
      firstHomerun: {
          title: "첫 홈런!",
          description: "처음으로 숫자를 맞히는 데 성공했습니다."
      },
      perfectGame: {
          title: "퍼펙트 게임",
          description: "첫 번째 시도에서 숫자를 맞혔습니다."
      },
      win100: {
          title: "베테랑 타자",
          description: "오늘의 도전에서 100번 승리했습니다."
      },
      perfectWeek: {
          title: "연승 행진",
          description: "7일 연속으로 오늘의 도전에 성공했습니다."
      }
    },
    ranking: {
        title: "주간 랭킹",
        timeLeft: "시즌 종료까지 {{time}}",
        minimumAttempts: "평균 시도",
        mostHomeruns: "총 홈런",
        rank: "순위",
        player: "플레이어",
        record: "기록",
        reward: "보상",
        myRank: "내 순위: {{rank}}위",
    },
};

export const translations: Translations = {
  en: enTranslations,
  ko: koTranslations,
};