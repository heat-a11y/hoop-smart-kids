const offenseScenarios = {
  tripleThreat: {
    id: 'triple-threat',
    en: {
      title: 'Pass, Shoot, or Drive?',
      subtitle: 'Triple Threat Decision',
      setup: "The defender is sagging off — they're giving you 3 feet of space! You're wide open at the 3-point line. What do you do?",
      choices: [
        {
          id: 'A',
          label: 'Shoot the open jumper',
          correct: true,
          en: {
            title: 'Shoot the open jumper',
            feedback: "Yes! The defender gave you space because they're worried about your drive. That's a green light to shoot! Good shooters punish defenders who sag off.",
            tip: 'When the defender gives you space, it means they respect your speed. Make them pay by knocking down the open shot!',
          },
        },
        {
          id: 'B',
          label: 'Drive into the lane',
          correct: false,
          en: {
            title: 'Drive into traffic',
            feedback: "Oops! The lane is clogged with defenders. Driving into 3 people is a turnover waiting to happen. Look for space first!",
            tip: 'Driving into a crowd = TO. Check the paint before you put the ball on the floor.',
          },
        },
        {
          id: 'C',
          label: 'Pass back to PG',
          correct: 'suboptimal',
          en: {
            title: 'Pass back',
            feedback: "You had a wide-open shot! Passing up an open look lets the defense recover. Be aggressive when you're open!",
            tip: "Don't pass up open shots! The offense flows when shooters shoot.",
          },
        },
      ],
    },
    zh: {
      title: '传球、投篮还是突破？',
      subtitle: '三重威胁决策',
      setup: '防守球员在后退——他们给了你3英尺的空间！你在三分线外完全空位。你该怎么做？',
      choices: [
        {
          id: 'A',
          label: '投篮 - 空位跳投',
          correct: true,
          zh: {
            title: '投篮 - 空位跳投',
            feedback: '没错！防守球员给你空间是因为他们怕你突破。这是投篮绿灯！好的投手会惩罚后退的防守者。',
            tip: '当防守者给你空间时，说明他们尊重你的速度。投进空位投篮来惩罚他们！',
          },
        },
        {
          id: 'B',
          label: '突破到篮下',
          correct: false,
          zh: {
            title: '突破到拥挤区域',
            feedback: '哎呀！禁区里都是防守球员。突破到3个人中间就等于失误。先观察空间！',
            tip: '突破到人群中 = 失误。下球前先观察禁区情况。',
          },
        },
        {
          id: 'C',
          label: '回传给控卫',
          correct: 'suboptimal',
          zh: {
            title: '回传',
            feedback: '你有空位投篮机会！放弃空位出手会让防守方有时间恢复。空位时要果断进攻！',
            tip: '不要放弃空位投篮！射手出手时进攻最流畅。',
          },
        },
      ],
    },
    diagram: {
      ballHandler: { x: 200, y: 210, label: 'You' },
      teammate1: { x: 300, y: 250, label: 'SG' },
      teammate2: { x: 140, y: 260, label: 'PG' },
      teammate3: { x: 380, y: 280, label: 'SF' },
      defender1: { x: 200, y: 170, label: 'D' },
      defender2: { x: 260, y: 220, label: 'D' },
      defender3: { x: 320, y: 190, label: 'D' },
      saggingArrow: { from: { x: 200, y: 185 }, to: { x: 200, y: 205 }, label: '3ft gap' },
    },
  },

  fastbreak: {
    id: 'fastbreak',
    en: {
      title: '2-on-1 Fastbreak',
      subtitle: 'Make the Right Read',
      setup: "You're sprinting down court on a 2-on-1 fastbreak! Your teammate is cutting to the basket on the left. The lone defender is backpedaling. As you drive, the defender commits to YOU! What's the play?",
      choices: [
        {
          id: 'A',
          label: 'Pass to teammate for layup',
          correct: true,
          en: {
            title: 'Pass for the easy layup',
            feedback: "Perfect read! The defender committed to you, which leaves your teammate wide open under the hoop. Simple bounce pass = easy 2 points. That's team basketball!",
            tip: 'In a 2-on-1, the defender can only guard one of you. Make them pick — then hit the open man!',
          },
        },
        {
          id: 'B',
          label: 'Try to score through the defender',
          correct: false,
          en: {
            title: 'Force the shot over the defender',
            feedback: "Tough way to go! The defender is right in front of you — you're likely getting blocked or charging. When you have numbers advantage, share the ball!",
            tip: 'Hero ball loses in 2-on-1. The pass is always faster than the defender.',
          },
        },
        {
          id: 'C',
          label: 'Pull up for a mid-range shot',
          correct: false,
          en: {
            title: 'Pull up for mid-range',
            feedback: "You had a numbers advantage! Pulling up for a low-percentage jumper wastes the fastbreak opportunity. Attack the rim or find the open teammate.",
            tip: 'In transition, attack the rim. Mid-range is the lowest value shot in basketball.',
          },
        },
      ],
    },
    zh: {
      title: '2对1快攻',
      subtitle: '做出正确判断',
      setup: '你在快攻中全速冲刺！你的队友正切入左侧篮下。唯一一名防守球员在后退。当你突破时，防守者扑向了你！该怎么打？',
      choices: [
        {
          id: 'A',
          label: '传给队友上篮',
          correct: true,
          zh: {
            title: '传球轻松上篮',
            feedback: '完美的判断！防守者扑向你，让队友在篮下完全空位。简单的击地传球 = 轻松2分。这就是团队篮球！',
            tip: '在2对1快攻中，防守者只能防一个人。逼他们选择，然后传给空位的队友！',
          },
        },
        {
          id: 'B',
          label: '强行突破防守者',
          correct: false,
          zh: {
            title: '强行投篮',
            feedback: '太难了！防守者就在你面前——你很可能被盖帽或撞人犯规。当你们人数占优时，要分享球！',
            tip: '个人英雄主义在2对1中会失败。传球总是比防守者快。',
          },
        },
        {
          id: 'C',
          label: '急停跳投',
          correct: false,
          zh: {
            title: '急停中投',
            feedback: '你们有人数优势！急停跳投命中率低，浪费了快攻机会。攻击篮筐或找空位队友。',
            tip: '快攻时要攻击篮筐。中投是篮球中价值最低的投篮。',
          },
        },
      ],
    },
    diagram: {
      ballHandler: { x: 200, y: 280, label: 'You' },
      teammate1: { x: 100, y: 140, label: 'Teammate' },
      defender1: { x: 200, y: 200, label: 'D' },
      pathArrow: { from: { x: 200, y: 280 }, to: { x: 200, y: 210 }, label: 'drive' },
      passArrow: { from: { x: 200, y: 210 }, to: { x: 120, y: 140 }, label: 'pass' },
    },
  },

  spacing: {
    id: 'spacing',
    en: {
      title: 'Space the Floor!',
      subtitle: 'Find the Open Spot',
      setup: "Too many players are crowded in the key! Drag the highlighted player from the crowded paint to the open wing to create proper spacing. Good spacing = better passing lanes + driving room!",
      choices: [
        {
          id: 'A',
          label: 'Move to the wing (Correct!)',
          correct: true,
          en: {
            title: 'Great spacing!',
            feedback: "Excellent! By moving to the wing, you've opened up the floor. Now the ball handler has space to drive, passing lanes are clear, and the defense has to spread out. This is how good offense works!",
            tip: 'Spacing creates driving lanes, passing angles, and makes the defense work harder. Never stand next to your teammate!',
          },
        },
        {
          id: 'B',
          label: 'Stay in the paint',
          correct: false,
          en: {
            title: 'Too crowded!',
            feedback: "The paint is already packed! Standing next to your teammate makes it easy for one defender to guard two players. Spread out to give everyone room to work.",
            tip: 'One defender can guard two players who stand close together. Space = power!',
          },
        },
      ],
    },
    zh: {
      title: '拉开空间！',
      subtitle: '找到空位',
      setup: '太多球员挤在禁区里了！把高亮的球员从拥挤的禁区拖到空位侧翼，创造合理的空间。好的空间 = 更好的传球路线 + 突破空间！',
      choices: [
        {
          id: 'A',
          label: '移动到侧翼（正确！）',
          correct: true,
          zh: {
            title: '出色的空间！',
            feedback: '太棒了！通过移动到侧翼，你打开了进攻空间。现在持球者有突破空间，传球路线清晰，防守方必须分散。这就是好的进攻！',
            tip: '空间创造突破路线、传球角度，让防守更费力。永远不要站在队友旁边！',
          },
        },
        {
          id: 'B',
          label: '留在禁区',
          correct: false,
          zh: {
            title: '太拥挤了！',
            feedback: '禁区已经挤满了！站在队友旁边会让一个防守者轻松防两个人。散开给每个人工作的空间。',
            tip: '一个防守者可以防住两个站在一起的球员。空间 = 力量！',
          },
        },
      ],
    },
    diagram: {
      positions: [
        { id: 'player1', x: 250, y: 200, label: 'You', draggable: true, startX: 250, startY: 200, targetX: 100, targetY: 160 },
        { id: 'player2', x: 280, y: 220, label: 'PG', draggable: false },
        { id: 'player3', x: 230, y: 240, label: 'SF', draggable: false },
        { id: 'player4', x: 310, y: 180, label: 'SG', draggable: false },
        { id: 'def1', x: 270, y: 210, label: 'D', draggable: false, defender: true },
        { id: 'def2', x: 300, y: 230, label: 'D', draggable: false, defender: true },
      ],
      targetZone: { x: 90, y: 150, width: 60, height: 60 },
    },
  },
};

const NEW_OFFENSE_SCENARIOS = {
  pickAndRoll: {
    id: 'pick-and-roll',
    en: {
      title: 'Read the Pick & Roll',
      subtitle: 'Make the Right Decision Off the Screen',
      setup: "You bring the ball up and call for a pick from your center. The defender goes UNDER the screen to prevent your drive, sagging way back. Your roll man is diving to the basket with a smaller defender switched onto them. What's your move?",
      choices: [
        { id: 'A', label: 'Pull up for the open jumper', correct: true,
          en: { title: 'Pull up for the jumper!', feedback: "Perfect! When the defender goes under the screen, they're begging you to shoot. If you can knock down that jumper, they'll have to go over the top next time, which opens up your drive. Make them pay!", tip: 'When the defense goes under the screen, shoot it. When they go over, drive. Simple read!' } },
        { id: 'B', label: 'Drive hard to the basket', correct: false,
          en: { title: 'Drive into a crowd', feedback: "The defender went UNDER — they're already positioned to cut off your drive. If you try to force it, you'll run into the help defender too. The open shot was the right call here.", tip: 'Defender going under = they want you to drive so the help can trap you. Shoot instead!' } },
        { id: 'C', label: 'Lob pass to the roller', correct: false,
          en: { title: 'Lob intercepted!', feedback: "The defender going under is in perfect position to intercept a lob. Your roller is open underneath only if the defense is stretched — here, the floater or pull-up is higher percentage.", tip: "Don't force the lob when the paint is protected. Take what the defense gives you." } },
      ],
    },
    zh: {
      title: '挡拆阅读',
      subtitle: '在掩护后做出正确决策',
      setup: '你运球过半场，呼叫中锋做挡拆。防守球员选择从掩护下方绕过，大幅后退阻止你突破。你的顺下队友正冲向篮筐，由一名小个子防守者换防。你该怎么做？',
      choices: [
        { id: 'A', label: '急停跳投', correct: true,
          zh: { title: '急停跳投！', feedback: '完美！当防守者从掩护下方绕过时，他们是在让你投篮。如果你能投进，下次他们就会从上方绕过，为你打开突破空间。让他们付出代价！', tip: '防守从下方绕过就投篮，从上方绕过就突破。简单阅读！' } },
        { id: 'B', label: '强行突破', correct: false,
          zh: { title: '突破入人群', feedback: '防守者从下方绕过已经有了突破位置的准备。强行突破会遇到协防。空位投篮才是正确选择。', tip: '防守从下方绕过 = 他们想让你突破以便夹击。选择投篮！' } },
        { id: 'C', label: '高吊传给顺下队友', correct: false,
          zh: { title: '高吊被截！', feedback: '从下方绕过的防守者正好可以截断高吊传球。只有防守被拉开时才能传顺下，这里中投或急停跳投更高效。', tip: '不要强行传高吊球。接受防守给你的机会。' } },
      ],
    },
    diagram: {
      ballHandler: { x: 200, y: 230, label: 'You' },
      teammate1: { x: 200, y: 150, label: 'C/Roller' },
      teammate2: { x: 300, y: 240, label: 'SG' },
      defender1: { x: 200, y: 190, label: 'D (under)' },
      defender2: { x: 200, y: 140, label: 'Help' },
    },
  },

  giveAndGo: {
    id: 'give-and-go',
    en: {
      title: 'Give & Go',
      subtitle: 'Pass and Cut Decision',
      setup: "You pass to your teammate on the wing. Your defender turns their head to watch the ball for just a split second. That's all the separation you need. What's the right read?",
      choices: [
        { id: 'A', label: 'Backdoor cut to the basket', correct: true,
          en: { title: 'Sharp cut!', feedback: "YES! When your defender ball-watches, that's your cue to cut hard to the rim. Your teammate will find you with a pass for an easy layup. The give-and-go is the oldest play in basketball for a reason!", tip: 'If your defender looks at the ball, they lose you. Cut hard and expect the pass back.' } },
        { id: 'B', label: 'Stand still and wait', correct: false,
          en: { title: 'Defense recovers', feedback: "By standing still, you let your defender recover. The window for the cut was open for only a second — and you missed it. Keep moving off the ball!", tip: 'If you pass, don\'t stand and watch. Cut, screen, or relocate. Movement creates offense.' } },
        { id: 'C', label: 'Set a screen for the passer', correct: 'suboptimal',
          en: { title: 'Screen not needed here', feedback: 'Setting a screen for your teammate could work, but the backdoor cut is wide open and leads to a higher-percentage shot. Take the easy points first!', tip: 'Look for the cut first. If it\'s not there, set the screen.' } },
      ],
    },
    zh: {
      title: '传切配合',
      subtitle: '传球后切入决策',
      setup: '你把球传给侧翼的队友。你的防守者转头看球了一瞬间。这就是你需要的空档。正确的选择是什么？',
      choices: [
        { id: 'A', label: '反跑切入篮下', correct: true,
          zh: { title: '犀利切入！', feedback: '没错！当你的防守者看球时，就是你切入篮下的信号。你的队友会找到你传出一个轻松上篮。传切配合是最古老的篮球战术，原因就在这里！', tip: '如果防守者看球，他们就会失去你。果断切入并期待回传。' } },
        { id: 'B', label: '站在原地等待', correct: false,
          zh: { title: '防守恢复', feedback: '站在原地让防守者有恢复时间。切入的窗口只开了一瞬间——你错过了。球传出去后要继续移动！', tip: '传完球不要站着看。切入、掩护或重新定位。移动创造进攻。' } },
        { id: 'C', label: '给持球队友做掩护', correct: 'suboptimal',
          zh: { title: '这里不需要掩护', feedback: '给队友做掩护也可以，但反跑切入是完全空位且命中率更高。先拿轻松的分！', tip: '先寻找切入机会。如果没有，再做掩护。' } },
      ],
    },
    diagram: {
      ballHandler: { x: 200, y: 230, label: 'You' },
      teammate1: { x: 300, y: 220, label: 'PG' },
      defender1: { x: 200, y: 170, label: 'D' },
      defender2: { x: 300, y: 180, label: 'D' },
    },
  },

  postUp: {
    id: 'post-up',
    en: {
      title: 'Post-Up Vision',
      subtitle: 'Read the Double Team',
      setup: "You catch the ball in the low post with your back to the basket. Your defender is playing solid D, and you see their teammate starting to creep over for a double team. What's the smartest play?",
      choices: [
        { id: 'A', label: 'Quick pass to the open man', correct: true,
          en: { title: 'Great vision!', feedback: "EXACTLY! You saw the double team coming and made the extra pass before getting trapped. Your teammate is now wide open. Good post players score, GREAT post players make everyone better!", tip: 'Always know where your teammates are before you catch the post entry. Beats the double team every time.' } },
        { id: 'B', label: 'Try to score through both', correct: false,
          en: { title: 'Blocked!', feedback: "Two defenders are too much even for the best post players. You're getting stripped or blocked. Trust your teammates and make the pass — you'll get the ball back next possession!", tip: 'Double team = someone is open. Find them immediately.' } },
        { id: 'C', label: 'Wait for the double to arrive', correct: false,
          en: { title: 'Too late!', feedback: "Once the double team arrives, your passing lanes shrink and you're in trouble. The key is to make your move BEFORE the double comes, not after.", tip: 'Read the defense early. The moment they commit two, the ball should be out of your hands.' } },
      ],
    },
    zh: {
      title: '低位策应',
      subtitle: '阅读包夹防守',
      setup: '你在低位接球，背对篮筐。防守者贴防很紧，你看到对方另一名球员正在靠近准备包夹。最聪明的打法是什么？',
      choices: [
        { id: 'A', label: '快速传给空位队友', correct: true,
          zh: { title: '出色的视野！', feedback: '太对了！你在包夹形成之前就看到了并传出了球。你的队友现在完全空位。好的低位球员能得分，伟大的低位球员能让每个队友变得更好！', tip: '在低位接球前就要知道队友的位置。这样每次都能破解包夹。' } },
        { id: 'B', label: '强打两人', correct: false,
          zh: { title: '被盖了！', feedback: '两个防守者即使对最好的低位球员也太多了。你会被抢断或盖帽。相信队友并传球——下次进攻球还会回到你手中！', tip: '包夹 = 有人空位。立刻找到他。' } },
        { id: 'C', label: '等包夹来了再说', correct: false,
          zh: { title: '太晚了！', feedback: '包夹一旦形成，你的传球路线就会被封锁。关键是在包夹到来之前做出决定，而不是之后。', tip: '尽早阅读防守。一旦他们两人包夹，球就应该已经传出。' } },
      ],
    },
    diagram: {
      ballHandler: { x: 200, y: 180, label: 'You' },
      teammate1: { x: 300, y: 240, label: 'PG' },
      teammate2: { x: 120, y: 230, label: 'SF' },
      defender1: { x: 200, y: 140, label: 'D' },
      defender2: { x: 260, y: 160, label: 'Help' },
      defender3: { x: 180, y: 160, label: 'Doubler' },
    },
  },

  isolation: {
    id: 'isolation',
    en: {
      title: 'Isolation Attack',
      subtitle: 'When to Go 1-on-1',
      setup: "You're isolated at the top of the key with your defender in front of you. You have a size advantage — you're taller and stronger. The shot clock is at 10 seconds. What's the right approach?",
      choices: [
        { id: 'A', label: 'Back them down, seal, and score', correct: true,
          en: { title: 'Use your size!', feedback: "EXACTLY! You have a size advantage — use it. Back your defender down, feel their position, seal them on your hip, and finish over them. That's efficient offense. No wasted dribbles.", tip: 'When you have a size mismatch, punish it immediately. Take one or two dribbles and go to work.' } },
        { id: 'B', label: 'Fancy crossovers and step-back', correct: false,
          en: { title: 'Too complicated', feedback: "Fancy dribbling wastes your size advantage and risks a turnover. You're taller — why are you playing small? Post them up or face up and attack the rim directly.", tip: 'Play to your strengths. If you\'re bigger, don\'t dance on the perimeter.' } },
        { id: 'C', label: 'Pass it out and reset', correct: 'suboptimal',
          en: { title: 'You had the advantage', feedback: "You passed up a mismatch! With 10 seconds on the clock, you have time to attack. If you consistently pass out of mismatches, the defense doesn't respect you. Be aggressive!", tip: 'Isolation mismatches are gold. Attack before the defense can send help.' } },
      ],
    },
    zh: {
      title: '单打进攻',
      subtitle: '何时一对一',
      setup: '你在弧顶单打，防守者在你面前。你有身材优势——更高更壮。进攻时间还剩10秒。正确的做法是什么？',
      choices: [
        { id: 'A', label: '背身推进，卡位，得分', correct: true,
          zh: { title: '利用你的身材！', feedback: '没错！你有身材优势就利用它。背身推进，感受防守者的位置，把他们卡在身侧，然后在他们头上得分。这就是高效的进攻。不浪费运球。', tip: '当你有身材优势时，立即利用。一两下运球就开始进攻。' } },
        { id: 'B', label: '花式运球和后撤步', correct: false,
          zh: { title: '太复杂了', feedback: '花式运球浪费了你的身材优势还冒着失误的风险。你更高——为什么要打小个球？面框或背筐直接攻击篮筐。', tip: '发挥你的优势。如果你更大只，不要在外线跳舞。' } },
        { id: 'C', label: '传出去重新组织', correct: 'suboptimal',
          zh: { title: '你有优势', feedback: '你放弃了错位机会！还有10秒，你有时间进攻。如果你总是放弃错位，防守者就不会尊重你。要果断！', tip: '单打错位是金子。在防守协防到来之前进攻！' } },
      ],
    },
    diagram: {
      ballHandler: { x: 200, y: 230, label: 'You' },
      teammate1: { x: 300, y: 250, label: 'SG' },
      teammate2: { x: 120, y: 240, label: 'PG' },
      defender1: { x: 200, y: 180, label: 'D' },
    },
  },

  backdoor: {
    id: 'backdoor',
    en: {
      title: 'Backdoor Cut',
      subtitle: 'When They Overplay You',
      setup: "You're on the wing and your defender is overplaying the passing lane, trying to deny you the ball. They're face-guarding you with their back to the basket. Your teammate sees this and wants to pass to you. What's the right move?",
      choices: [
        { id: 'A', label: 'Fake out, then backdoor cut to the rim', correct: true,
          en: { title: 'Beautiful backdoor!', feedback: "TEXTBOOK! When a defender overplays the passing lane, they're vulnerable to the back cut. Give a slight move toward the ball (to sell the catch), then explode to the basket. Your teammate hits you with the pass for an easy layup!", tip: 'Overplay = backdoor. If they deny the pass, cut behind them. Simple read.' } },
        { id: 'B', label: 'Stand still and hope for the pass', correct: false,
          en: { title: 'Too easy to guard', feedback: "Standing still makes you easy to guard. The defender has you denied — you're not getting the ball here. You need to CREATE separation with movement.", tip: 'If you can\'t get the ball, MOVE. Don\'t stand and watch. Cut, screen, or relocate.' } },
        { id: 'C', label: 'Run to the opposite side of the court', correct: false,
          en: { title: 'Too far', feedback: "Relocating is good, but you went too far. A quick backdoor cut takes advantage of the defender's momentum and gets you an open layup. Running to the other side gives them time to recover.", tip: 'When they overplay, the shortest path to open is behind them. Backdoor cut!' } },
      ],
    },
    zh: {
      title: '反跑切入',
      subtitle: '当防守者过度防守时',
      setup: '你在侧翼，防守者过度防守传球路线，试图阻止你接球。他们在面贴防守你，背对篮筐。你的队友看到了这一点想传球给你。正确的做法是什么？',
      choices: [
        { id: 'A', label: '假动作接球，然后反跑切入篮下', correct: true,
          zh: { title: '漂亮的反跑！', feedback: '教科书！当防守者过度防守传球路线时，他们容易被打反跑。先向球方向做接球假动作，然后爆发切入篮下。你的队友传球给你轻松上篮！', tip: '过度防守 = 反跑。如果他们阻止接球，就从他们身后切入。简单阅读。' } },
        { id: 'B', label: '站着等传球', correct: false,
          zh: { title: '太好防了', feedback: '站着不动让你很容易被防守。防守者阻止了你接球——你在这里拿不到球。你需要通过移动创造空间。', tip: '如果你接不到球，就移动。不要站着看。切入、掩护或重新定位。' } },
        { id: 'C', label: '跑到球场的另一侧', correct: false,
          zh: { title: '太远了', feedback: '重新定位是好的，但你跑太远了。快速反跑利用防守者的动量来获得空位上篮。跑到另一侧给了他们恢复的时间。', tip: '当防守者过度防守时，最短的路径就是从他们身后切入。反跑！' } },
      ],
    },
    diagram: {
      ballHandler: { x: 200, y: 250, label: 'PG' },
      teammate1: { x: 300, y: 210, label: 'You' },
      defender1: { x: 300, y: 170, label: 'D (overplay)' },
    },
  },
};

// Merge new scenarios into the main export
const allOffenseScenarios = { ...offenseScenarios, ...NEW_OFFENSE_SCENARIOS };
export default allOffenseScenarios;
