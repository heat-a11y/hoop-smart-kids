const communicationScenarios = {
  callScreen: {
    id: 'call-screen',
    en: {
      title: 'Call the Screen!',
      subtitle: 'Vocal Communication Under Pressure',
      setup: "You're guarding the ball handler. The other team's screener is setting up a PICK from your blind side — your teammate behind you can see it coming! What do you need your teammate to yell?",
      instruction: "Look at the diagram. An opponent is sneaking in to set a screen from the left. Pick the callout that saves your team!",
      choices: [
        {
          id: 'screen', label: "📢 'SCREEN LEFT!'",
          correct: true,

          position: { x: 60, y: 272 },
          animate: [
            { target: 'defenderYou', to: { x: 200, y: 215 }, label: '🛡️ Adjusts!', color: '#2ECC71' },
            { target: 'screener', to: { x: 240, y: 190 }, label: '🧱 Screen whiffs!', color: '#EF4444' },
          ],
          en: { title: "SCREEN LEFT! — Perfect call!", feedback: "YES! 'Screen left' tells your teammate exactly where the pick is coming from. Now they can fight over the top or go under — they're prepared. Great communication saves the play!", tip: 'Always call the direction of the screen. "Screen left" or "Screen right" — simple, loud, clear.' } },
        {
          id: 'shoot', label: "📢 'SHOOT IT!'",
          correct: false,

          position: { x: 200, y: 272 },
          animate: [
            { target: 'defenderYou', to: { x: 200, y: 210 }, label: '💥 Blindsided!', color: '#EF4444' },
            { target: 'screener', to: { x: 210, y: 200 }, label: '🧱 Screen connects!', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 200, y: 250 }, label: '🏀 Free!', color: '#EF4444' },
          ],
          en: { title: "Wrong callout", feedback: "Whoa — your teammate gets blindsided by the screen! Yelling 'Shoot it!' doesn't warn them about the incoming pick. The screen connects and the ball handler gets free.", tip: "Only yell 'Shoot it!' when someone is actually open. For screens, say 'Screen left/right'!" } },
        {
          id: 'quiet', label: '🤐 Stay quiet',
          correct: false,

          position: { x: 340, y: 272 },
          animate: [
            { target: 'defenderYou', to: { x: 200, y: 210 }, label: '💥 Blindsided!', color: '#EF4444' },
            { target: 'screener', to: { x: 210, y: 200 }, label: '🧱 Screen connects!', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 200, y: 250 }, label: '🏀 Free!', color: '#EF4444' },
          ],
          en: { title: "Nothing — silence", feedback: "Silence = disaster. Your teammate has no idea the screen is coming and slams right into it. The ball handler now has a free path to the basket. Communication is free — use it!", tip: 'If you see something, say something. The court is loud — you need to be louder.' } },
      ],
    },
    zh: {
      title: '呼叫掩护！',
      subtitle: '压力下的声音沟通',
      setup: '你在防守持球者。对方的一名球员正从你的盲侧准备做掩护——你的队友在你身后能看到！你需要队友喊什么？',
      instruction: '看场地图。一个对手正从左侧悄悄靠近准备掩护。选择能拯救团队的正确口令！',
      choices: [
        {
          id: 'screen', label: "📢 '左边有掩护！'",
          correct: true,

          position: { x: 60, y: 272 },
          animate: [
            { target: 'defenderYou', to: { x: 200, y: 215 }, label: '🛡️ 调整！', color: '#2ECC71' },
            { target: 'screener', to: { x: 240, y: 190 }, label: '🧱 掩护扑空！', color: '#EF4444' },
          ],
          zh: { title: '左边有掩护！——完美呼叫！', feedback: '没错！"左边有掩护"准确告诉队友掩护来自哪里。现在他们可以选择绕过或挤过掩护——他们有了准备。好的沟通拯救了这次防守！', tip: '永远喊出掩护的方向。"左边有掩护"或"右边有掩护"——简单、大声、清晰。' } },
        {
          id: 'shoot', label: "📢 '投篮！'",
          correct: false,

          position: { x: 200, y: 272 },
          animate: [
            { target: 'defenderYou', to: { x: 200, y: 210 }, label: '💥 被撞了！', color: '#EF4444' },
            { target: 'screener', to: { x: 210, y: 200 }, label: '🧱 挡住了！', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 200, y: 250 }, label: '🏀 空位！', color: '#EF4444' },
          ],
          zh: { title: '错误的口令', feedback: '哇——你的队友被掩护打了个措手不及！喊"投篮"没有警告他们即将到来的掩护。掩护成功，持球者获得了空位。', tip: '只有在队友真的空位时才喊"投篮"。遇到掩护，要说"左边/右边有掩护"！' } },
        {
          id: 'quiet', label: '🤐 保持安静',
          correct: false,

          position: { x: 340, y: 272 },
          animate: [
            { target: 'defenderYou', to: { x: 200, y: 210 }, label: '💥 被撞了！', color: '#EF4444' },
            { target: 'screener', to: { x: 210, y: 200 }, label: '🧱 挡住了！', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 200, y: 250 }, label: '🏀 空位！', color: '#EF4444' },
          ],
          zh: { title: '沉默——什么都没说', feedback: '沉默 = 灾难。你的队友完全不知道掩护来了，直接撞了上去。持球者现在有了直通篮筐的路线。沟通是免费的——要用它！', tip: '看到什么就说什么。球场上很吵——你得更响。' } },
      ],
    },
    diagram: {
      ballHandler: { x: 180, y: 260, label: 'PG' },
      defenderYou: { x: 170, y: 230, label: 'You' },
      'teammate guarding': { x: 200, y: 200, label: 'Teammate' },
      screener: { x: 250, y: 180, label: 'Screener' },
      screenArrow: { from: { x: 280, y: 170 }, to: { x: 210, y: 215 }, label: 'screen path' },
    },
  },

  calloutBoard: {
    id: 'callout-board',
    en: {
      title: 'Callout Soundboard',
      subtitle: 'Tap the Right Call for the Situation',
      setup: "Different situations need different calls! Tap each scene and choose the right callout. Let's practice the three most important defensive calls in basketball!",
      rounds: [
        {
          id: 'round1',
          scene: "The ball handler is picking up their dribble and trapped! Your teammate is closing in. What do you yell to pressure them?",
          correctCall: 'ball',
          en: { title: 'Ball Pressure!', feedback: "BALL! — Perfect! This tells your teammate to apply tight pressure. The handler can't dribble, can't pass easily — they're stuck!", tip: '"Ball!" means "Get on the ball and pressure up." It triggers the whole team to tighten up.' },
          zh: { title: '压球！', feedback: '"压球！——完美！这告诉你的队友紧逼持球者。对方不能运球，不能轻松传球——他们被锁住了！', tip: '"压球"意味着"贴上去紧逼。"这会触发全队收紧防守。' },
        },
        {
          id: 'round2',
          scene: "A teammate just got beaten off the dribble. The driver is heading to the basket. You're the nearest defender. What's the call?",
          correctCall: 'help',
          en: { title: 'Help Defense!', feedback: "HELP! — Great rotation! You alert your teammate that help is coming so they can fight back to their man. The team rotates, the drive is stopped!", tip: '"Help!" is the universal signal for "I\'ve got your back — rotate!" Use it early.' },
          zh: { title: '协防！', feedback: '"协防！——出色的轮转！你告诉队友协防来了，他们可以努力回到自己防守人身边。团队轮转，突破被阻止！', tip: '"协防"是"我来帮你——轮转！"的通用信号。要提前喊。' },
        },
        {
          id: 'round3',
          scene: "A shot goes up and you're in perfect position to grab the rebound. What do you shout so your teammates know to transition?",
          correctCall: 'rebound',
          en: { title: 'Calling the Rebound!', feedback: "GOT REBOUND! — Excellent! Now your team knows you've secured the ball and they can sprint out in transition. No confusion, no fighting your own teammate for the ball!", tip: '"Got rebound!" claims the ball and triggers the fastbreak. Everyone knows their next move.' },
          zh: { title: '叫篮板！', feedback: '"我的篮板！——太棒了！现在你的队友知道你拿到了球，他们可以快下冲刺。没有混乱，没有和自己人抢球！', tip: '"我的篮板"宣告拿球并触发快攻。每个人都知道下一步该做什么。' },
        },
      ],
      buttons: [
        { id: 'ball', labelEn: "BALL! / 压球！", emoji: '🔊', color: 'from-neon-blue to-blue-600' },
        { id: 'help', labelEn: "HELP! / 协防！", emoji: '🛡️', color: 'from-court-orange to-basketball-red' },
        { id: 'rebound', labelEn: "GOT REBOUND! / 我的篮板！", emoji: '💪', color: 'from-success-green to-emerald-600' },
      ],
    },
    zh: {
      title: '口令发声板',
      subtitle: '根据情况点击正确口令',
      setup: '不同的情况需要不同的口令！点击每个场景并选择正确的口令。让我们练习篮球中三个最重要的防守口令！',
      rounds: [
        {
          id: 'round1',
          scene: '持球者收球了并被包夹！你的队友正在靠近。你喊什么来施压？',
          correctCall: 'ball',
        },
        {
          id: 'round2',
          scene: '队友被突破过掉了。突破者正冲向篮筐。你是最近的防守者。该喊什么？',
          correctCall: 'help',
        },
        {
          id: 'round3',
          scene: '有人投篮了，你处在抢篮板的完美位置。你喊什么让队友知道转换进攻？',
          correctCall: 'rebound',
        },
      ],
    },
  },

  encouragement: {
    id: 'encouragement',
    en: {
      title: 'Teammate Encouragement',
      subtitle: 'Build Your Team Up!',
      setup: "Your teammate just drove hard to the basket, beat their defender, but missed a wide-open layup. They're hanging their head and looking frustrated. You're the team captain — what do you do?",
      initialReaction: 'Your teammate misses the layup... 😞',
      choices: [
        {
          id: 'encourage',
          label: "💪 'Head up! Great try! Let's get back on D!'",
          correct: true,
          en: { title: 'Team Captain Energy!', feedback: "THAT'S a leader! Your teammate instantly feels better knowing you've got their back. The whole team's spirit goes up. Players who feel supported play better. You just made your team stronger!", tip: 'A simple "Head up, next play" can change a teammate\'s whole game. Be the reason someone believes in themselves.' } },
        {
          id: 'blame',
          label: "😤 'Come on, you gotta make those!'",
          correct: false,
          en: { title: 'That stings...', feedback: "Your teammate's shoulders drop even more. Now they're playing scared, afraid to make another mistake. The team atmosphere gets tense. Blame never made anyone play better.", tip: 'Your teammate already knows they messed up. yelling at them doesn\'t help — lifting them up does.' } },
        {
          id: 'silent',
          label: "🤐 Say nothing, look away",
          correct: false,
          en: { title: 'Silence hurts too', feedback: "Your teammate notices you looked away. They feel alone out there. Silence can feel like judgment. Even a quick 'next play' or fist bump changes everything.", tip: 'Silence on the court whispers "I don\'t have your back." A fist bump, a word — anything is better than nothing.' } },
      ],
    },
    zh: {
      title: '鼓励队友',
      subtitle: '建设你的团队！',
      setup: '你的队友刚刚突破到篮下，过掉了防守者，但错失了一个空位上篮。他们低着头，看起来很沮丧。你是球队队长——你该怎么做？',
      initialReaction: '你的队友上篮不中... 😞',
      choices: [
        {
          id: 'encourage',
          label: "💪 '没关系头抬起来！积极回防！'",
          correct: true,
          zh: { title: '队长能量！', feedback: '这才是领袖！你的队友知道你支持他们，立刻感觉好多了。整个团队的士气都提升了。感到被支持的球员打得更好。你让你的团队更强大！', tip: '一句简单的"头抬起来，下一个球"可以改变一个队友的整场比赛。做一个让别人相信自己的人。' } },
        {
          id: 'blame',
          label: "😤 '这球你得进啊！'",
          correct: false,
          zh: { title: '这很伤人...', feedback: '你的队友肩膀垂得更低了。现在他们害怕犯错，打得畏手畏脚。团队氛围变得紧张。指责从来不会让任何人打得更好。', tip: '你的队友已经知道自己搞砸了。骂他们没用——鼓励他们才有效。' } },
        {
          id: 'silent',
          label: '🤐 什么也不说，移开视线',
          correct: false,
          zh: { title: '沉默也很伤人', feedback: '你的队友注意到你移开了视线。他们觉得在场上很孤独。沉默可能让人感到被评判。即使一句简单的"下一个球"或碰拳都能改变一切。', tip: '球场上的沉默似乎在说"我不支持你。"一次碰拳，一句话——什么都比什么都不做强。' } },
      ],
    },
    teamSpiritEvents: {
      encourage: { gain: 40, message: '💪 Team Spirit +40!', messageZh: '💪 团队士气+40！' },
      blame: { gain: -10, message: '😤 Team Spirit -10...', messageZh: '😤 团队士气-10...' },
      silent: { gain: -5, message: '🤐 Team Spirit -5...', messageZh: '🤐 团队士气-5...' },
    },
  },
};

const NEW_COMM_SCENARIOS = {
  callSwitch: {
    id: 'call-switch',
    en: {
      title: 'Call the Switch',
      subtitle: 'Defensive Switch Communication',
      setup: "A screen is coming on the wing. You and your teammate are both good defenders who can guard multiple positions. The ball handler is quick but small, and the screener is a big who can post up. What do you call?",
      choices: [
        { id: 'A', label: "'SWITCH!' — Swap assignments", correct: true,

          position: { x: 60, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 200, y: 200 }, label: '🔄 Takes screener', color: '#2ECC71' },
            { target: 'defender2', to: { x: 200, y: 250 }, label: '🔄 Picks up PG', color: '#00D4FF' },
            { target: 'ballHandler', to: { x: 200, y: 260 }, label: '👀 No opening', color: '#FFE135' },
          ],
          en: { title: 'Clean switch!', feedback: "Excellent call! Switching works here because you're both capable defenders. By calling 'Switch!' early, there's no confusion — your teammate picks up your man, you take theirs. No open shooter, no blown coverage.", tip: 'Call switch BEFORE the screen arrives, not during. Early communication = clean defense.' } },
        { id: 'B', label: "'FIGHT THROUGH!' — Chase over the top", correct: false,

          position: { x: 200, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 200, y: 220 }, label: '🚶 Fighting through', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 180, y: 260 }, label: '🏃 Turns corner!', color: '#EF4444' },
          ],
          en: { title: 'Too slow!', feedback: "Fighting through puts you a step behind while the ball handler turns the corner. They get an open look or force help rotation. If you can switch, switch — it keeps the pressure on.", tip: 'Only fight through screens if switching creates a terrible mismatch.' } },
        { id: 'C', label: 'Stay silent, see what happens', correct: false,

          position: { x: 340, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 200, y: 240 }, label: '❓ Confused', color: '#EF4444' },
            { target: 'defender2', to: { x: 200, y: 210 }, label: '❓ Confused', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 200, y: 260 }, label: '🏀 Open look!', color: '#EF4444' },
          ],
          en: { title: 'Disaster!', feedback: "Silence on a screen = one of you ends up guarding nobody while the other is stuck guarding two players. Communication isn't optional — it's mandatory on every screen.", tip: 'Every screen needs a call. Every single one. No exceptions.' } },
      ],
    },
    zh: {
      title: '呼叫换防',
      subtitle: '防守换防沟通',
      setup: '侧翼来了一个掩护。你和你队友都是能防多个位置的好防守者。持球者快速但身材矮小，掩护者是个大个子能低位单打。你该喊什么？',
      choices: [
        { id: 'A', label: '"换防！" — 交换防守对象', correct: true,

          position: { x: 60, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 200, y: 200 }, label: '🔄 防掩护者', color: '#2ECC71' },
            { target: 'defender2', to: { x: 200, y: 250 }, label: '🔄 防控卫', color: '#00D4FF' },
            { target: 'ballHandler', to: { x: 200, y: 260 }, label: '👀 没机会', color: '#FFE135' },
          ],
          zh: { title: '干净换防！', feedback: '出色的呼叫！换防在这里有效因为你们都是能干的防守者。通过提前喊"换防"，没有混乱——你的队友接你的人，你接他们的。没有空位射手，没有防守漏洞。', tip: '在掩护到来之前喊换防，而不是在过程中。早期沟通 = 干净防守。' } },
        { id: 'B', label: '"挤过！" — 从上方绕过', correct: false,

          position: { x: 200, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 200, y: 220 }, label: '🚶 在挤过', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 180, y: 260 }, label: '🏃 转身突破！', color: '#EF4444' },
          ],
          zh: { title: '太慢了！', feedback: '挤过掩护会让你慢一步，持球者已经转身突破了。他们会得到空位投篮机会或迫使协防。如果能换防就换防——保持压力。', tip: '只有当换防会造成严重错位时才挤过掩护。' } },
        { id: 'C', label: '保持沉默，见机行事', correct: false,

          position: { x: 340, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 200, y: 240 }, label: '❓ 混乱', color: '#EF4444' },
            { target: 'defender2', to: { x: 200, y: 210 }, label: '❓ 混乱', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 200, y: 260 }, label: '🏀 空位机会！', color: '#EF4444' },
          ],
          zh: { title: '灾难！', feedback: '面对掩护保持沉默 = 一人防不住任何人，另一人被迫一防二。沟通不是可选的——每次掩护都必须沟通。', tip: '每次掩护都需要一个口令。每一次。没有例外。' } },
      ],
    },
    diagram: {
      ballHandler: { x: 200, y: 260, label: 'PG' },
      teammate1: { x: 200, y: 190, label: 'Screener' },
      defender1: { x: 180, y: 230, label: 'You' },
      defender2: { x: 200, y: 160, label: 'Teammate' },
    },
  },

  transitionComm: {
    id: 'transition-comm',
    en: {
      title: 'Transition Defense',
      subtitle: 'Communicate the Matchups',
      setup: "The other team just grabbed a rebound and is pushing the ball up the court fast. You're sprinting back on defense with your teammates scattered. It's 4-on-3 against you. What do you yell?",
      choices: [
        { id: 'A', label: "'BALL! I GOT BALL!' — Pick up the handler", correct: true,

          position: { x: 60, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 200, y: 250 }, label: '🔊 Picks up ball!', color: '#2ECC71' },
            { target: 'ballHandler', to: { x: 200, y: 260 }, label: '⏳ Slowed down', color: '#FFE135' },
          ],
          en: { title: 'Stopped the break!', feedback: "YES! In transition, the most important call is 'BALL!' so everyone knows the ball is picked up.", tip: 'Transition defense starts with stopping the ball.' } },
        { id: 'B', label: "'FIND YOUR MAN!'", correct: false,

          position: { x: 200, y: 272 },
          animate: [
            { target: 'ballHandler', to: { x: 200, y: 240 }, label: '🏀 Uncontested!', color: '#EF4444' },
            { target: 'defender1', to: { x: 180, y: 230 }, label: '👀 Looking around', color: '#EF4444' },
          ],
          en: { title: 'Layup line!', feedback: "Everyone is looking around while the ball handler dribbles uncontested to the rim.", tip: 'Someone MUST pick up the ball immediately.' } },
        { id: 'C', label: 'Run to the paint and wait', correct: false,

          position: { x: 340, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 200, y: 200 }, label: '🏃 To paint', color: '#EF4444' },
            { target: 'defender2', to: { x: 160, y: 160 }, label: '🏃 To paint', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 200, y: 260 }, label: '🏀 Open 3!', color: '#EF4444' },
          ],
          en: { title: 'Open three!', feedback: "If everyone runs to the paint, the ball handler pulls up for a wide-open three.", tip: 'Match up on the perimeter first.' } },
      ],
    },
    zh: {
      title: '转换防守',
      subtitle: '沟通对位',
      setup: '对方刚抢到篮板并快速推进。你全速回防，队友们分散在各处。对方4对3快攻。你喊什么？',
      choices: [
        { id: 'A', label: '"球！我来防持球者！"', correct: true,

          position: { x: 60, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 200, y: 250 }, label: '🔊 防持球！', color: '#2ECC71' },
            { target: 'ballHandler', to: { x: 200, y: 260 }, label: '⏳ 减速', color: '#FFE135' },
          ],
          zh: { title: '阻止了快攻！', feedback: '对！转换中最重要的是喊"球！"', tip: '转换防守从阻止球开始。' } },
        { id: 'B', label: '"找到自己的人！"', correct: false,

          position: { x: 200, y: 272 },
          animate: [
            { target: 'ballHandler', to: { x: 200, y: 240 }, label: '🏀 无人防守！', color: '#EF4444' },
            { target: 'defender1', to: { x: 180, y: 230 }, label: '👀 到处看', color: '#EF4444' },
          ],
          zh: { title: '轻松上篮！', feedback: '所有人都在寻找自己的人，而持球者畅通无阻。', tip: '必须有人立即去防持球者。' } },
        { id: 'C', label: '跑回禁区等待', correct: false,

          position: { x: 340, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 200, y: 200 }, label: '🏃 回禁区', color: '#EF4444' },
            { target: 'defender2', to: { x: 160, y: 160 }, label: '🏃 回禁区', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 200, y: 260 }, label: '🏀 空位三分！', color: '#EF4444' },
          ],
          zh: { title: '空位三分！', feedback: '如果所有人都回禁区，持球者可投空位三分。', tip: '先在外线对位。' } },
      ],
    },
    diagram: {
      ballHandler: { x: 200, y: 280, label: 'PG' },
      teammate1: { x: 120, y: 200, label: 'Wing' },
      teammate2: { x: 280, y: 210, label: 'Wing' },
      defender1: { x: 200, y: 230, label: 'You' },
      defender2: { x: 150, y: 170, label: 'Teammate' },
    },
  },

  offBallScreen: {
    id: 'off-ball-screen',
    en: {
      title: 'Off-Ball Screen',
      subtitle: 'Communicate the Baseline Screen',
      setup: "Your teammate is chasing their man who is running off a baseline screen. Your teammate can't see the screener coming. What do you yell?",
      choices: [
        { id: 'A', label: "'BASELINE SCREEN!' — Direction + action", correct: true,

          position: { x: 60, y: 272 },
          animate: [
            { target: 'defender2', to: { x: 280, y: 160 }, label: '📢 Anticipates!', color: '#2ECC71' },
            { target: 'defender1', to: { x: 240, y: 150 }, label: '🧱 Screen missed', color: '#EF4444' },
          ],
          en: { title: 'Perfect heads-up!', feedback: "YES! 'Baseline screen' tells your teammate exactly where and what's coming. They anticipate the screen and fight over it cleanly.", tip: 'Call the direction first, then the action. "Baseline screen!" or "Top screen!"' } },
        { id: 'B', label: "'WATCH OUT!' — Vague warning", correct: false,

          position: { x: 200, y: 272 },
          animate: [
            { target: 'defender2', to: { x: 280, y: 170 }, label: '💥 Screened!', color: '#EF4444' },
            { target: 'defender1', to: { x: 250, y: 150 }, label: '🧱 Catches them!', color: '#EF4444' },
          ],
          en: { title: 'Too vague!', feedback: "'Watch out' doesn't tell them what's coming or from where. They get screened because they don't know what to watch for.", tip: 'Be specific: direction + action. Vague warnings = screened anyway.' } },
        { id: 'C', label: 'Stay silent — they should see it', correct: false,

          position: { x: 340, y: 272 },
          animate: [
            { target: 'defender2', to: { x: 280, y: 170 }, label: '💥 Screened!', color: '#EF4444' },
            { target: 'defender1', to: { x: 250, y: 150 }, label: '🧱 Catches them!', color: '#EF4444' },
          ],
          en: { title: 'Blindsided!', feedback: "They can't see the screener! Their eyes are on their man. Silence gets them screened every time.", tip: 'If you see a screen, SAY IT. Your teammate is focused on their man.' } },
      ],
    },
    zh: {
      title: '无球掩护',
      subtitle: '沟通底线掩护',
      setup: '你的队友在追防他们的人，对方正跑过一个底线掩护。你的队友看不到掩护者正在靠近。你喊什么？',
      choices: [
        { id: 'A', label: '"底线掩护！" — 方向加动作', correct: true,

          position: { x: 60, y: 272 },
          animate: [
            { target: 'defender2', to: { x: 280, y: 160 }, label: '📢 提前预判！', color: '#2ECC71' },
            { target: 'defender1', to: { x: 240, y: 150 }, label: '🧱 掩护扑空', color: '#EF4444' },
          ],
          zh: { title: '完美提醒！', feedback: '没错！"底线掩护"准确告诉队友是什么和来自哪里。他们预判掩护并干净地绕过。', tip: '先喊方向，再喊动作。"底线掩护！"或"上线掩护！"' } },
        { id: 'B', label: '"小心！" — 模糊警告', correct: false,

          position: { x: 200, y: 272 },
          animate: [
            { target: 'defender2', to: { x: 280, y: 170 }, label: '💥 被挡住了！', color: '#EF4444' },
            { target: 'defender1', to: { x: 250, y: 150 }, label: '🧱 被卡住！', color: '#EF4444' },
          ],
          zh: { title: '太模糊了！', feedback: '"小心"没有告诉队友什么来了或从哪里来。他们不知道要提防什么。', tip: '要具体：方向加动作。模糊的警告 = 还是被挡住。' } },
        { id: 'C', label: '保持沉默——他们应该能看到', correct: false,

          position: { x: 340, y: 272 },
          animate: [
            { target: 'defender2', to: { x: 280, y: 170 }, label: '💥 被挡住了！', color: '#EF4444' },
            { target: 'defender1', to: { x: 250, y: 150 }, label: '🧱 被卡住！', color: '#EF4444' },
          ],
          zh: { title: '被偷袭了！', feedback: '他们看不到掩护者！他们的眼睛盯着自己的人。沉默让他们每次都被挡住。', tip: '如果你看到掩护，就说出来。你的队友专注于他们的人。' } },
      ],
    },
    diagram: {
      ballHandler: { x: 120, y: 200, label: 'PG' },
      teammate1: { x: 280, y: 210, label: 'Your Teammate' },
      defender1: { x: 250, y: 140, label: 'Screener' },
      defender2: { x: 280, y: 170, label: 'You' },
    },
  },

  doubleTeam: {
    id: 'double-team',
    en: {
      title: 'Call the Double Team',
      subtitle: 'When and How to Trap',
      setup: "The other team's best player has the ball on the wing with their back to the basket. They've been scoring easily. You want to send a double team. What do you call?",
      choices: [
        { id: 'A', label: "'TRAP!' — Signal immediately", correct: true,

          position: { x: 60, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 270, y: 180 }, label: '🪤 Traps!', color: '#2ECC71' },
            { target: 'defender2', to: { x: 260, y: 190 }, label: '🪤 Help trap!', color: '#00D4FF' },
            { target: 'ballHandler', to: { x: 280, y: 200 }, label: '😰 Panics!', color: '#FFE135' },
          ],
          en: { title: 'Trap set!', feedback: "YES! 'Trap!' tells your teammate to come immediately. The ball handler panics and picks up their dribble. The trap forces a tough pass or a turnover.", tip: 'Call trap early — the moment the ball handler picks up their dribble, you\'ve won.' } },
        { id: 'B', label: "'HELP!' — Unclear intent", correct: false,

          position: { x: 200, y: 272 },
          animate: [
            { target: 'defender2', to: { x: 240, y: 190 }, label: '👀 Just helps', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 280, y: 200 }, label: '⏳ Has time', color: '#EF4444' },
          ],
          en: { title: 'Too slow!', feedback: "'Help' doesn't tell your teammate to trap — they just slide into help position, leaving the ball handler time to make a play.", tip: 'If you want a trap, say "TRAP!" If you want help, say "HELP!" Be clear.' } },
        { id: 'C', label: 'Wait and see if they score again', correct: false,

          position: { x: 340, y: 272 },
          animate: [
            { target: 'ballHandler', to: { x: 280, y: 180 }, label: '🏀 Scores again!', color: '#EF4444' },
          ],
          en: { title: 'Too late!', feedback: "Waiting means they score again. By the time you decide to trap, the damage is done. Be proactive, not reactive.", tip: 'Don\'t wait to get scored on. Trap early, trap often.' } },
      ],
    },
    zh: {
      title: '呼叫包夹',
      subtitle: '何时以及如何夹击',
      setup: '对方最好的球员在侧翼接球，背对篮筐。他们已经多次轻松得分。你想叫包夹。你喊什么？',
      choices: [
        { id: 'A', label: '"包夹！" — 立即信号', correct: true,

          position: { x: 60, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 270, y: 180 }, label: '🪤 包夹！', color: '#2ECC71' },
            { target: 'defender2', to: { x: 260, y: 190 }, label: '🪤 协防包夹！', color: '#00D4FF' },
            { target: 'ballHandler', to: { x: 280, y: 200 }, label: '😰 慌了！', color: '#FFE135' },
          ],
          zh: { title: '包夹到位！', feedback: '对！"包夹"告诉队友立即上前。持球者惊慌失措收球。包夹迫使艰难的传球或失误。', tip: '尽早喊包夹——持球者收球的那一刻你就赢了。' } },
        { id: 'B', label: '"协防！" — 意图不明确', correct: false,

          position: { x: 200, y: 272 },
          animate: [
            { target: 'defender2', to: { x: 240, y: 190 }, label: '👀 只是协防', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 280, y: 200 }, label: '⏳ 有时间', color: '#EF4444' },
          ],
          zh: { title: '太慢了！', feedback: '"协防"没有告诉队友要包夹——他们只会滑步到协防位置，给持球者时间处理球。', tip: '想要包夹就说"包夹"。想要协防就说"协防"。要清晰。' } },
        { id: 'C', label: '等着看他们是否再得分', correct: false,

          position: { x: 340, y: 272 },
          animate: [
            { target: 'ballHandler', to: { x: 280, y: 180 }, label: '🏀 又得分！', color: '#EF4444' },
          ],
          zh: { title: '太晚了！', feedback: '等待意味着他们再得分。等你决定包夹时，伤害已经造成了。要主动，不要被动。', tip: '不要等着被得分。尽早包夹，经常包夹。' } },
      ],
    },
    diagram: {
      ballHandler: { x: 280, y: 200, label: 'PG' },
      teammate1: { x: 150, y: 210, label: 'Teammate' },
      defender1: { x: 250, y: 170, label: 'You' },
      defender2: { x: 200, y: 190, label: 'Trapper' },
    },
  },
};

const allCommScenarios = { ...communicationScenarios, ...NEW_COMM_SCENARIOS };
export default allCommScenarios;
