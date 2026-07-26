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
          en: { title: "SCREEN LEFT! — Perfect call!", feedback: "YES! 'Screen left' tells your teammate exactly where the pick is coming from. Now they can fight over the top or go under — they're prepared. Great communication saves the play!", tip: 'Always call the direction of the screen. "Screen left" or "Screen right" — simple, loud, clear.' } },
        {
          id: 'shoot', label: "📢 'SHOOT IT!'",
          correct: false,
          en: { title: "Wrong callout", feedback: "Whoa — your teammate gets blindsided by the screen! Yelling 'Shoot it!' doesn't warn them about the incoming pick. The screen connects and the ball handler gets free.", tip: "Only yell 'Shoot it!' when someone is actually open. For screens, say 'Screen left/right'!" } },
        {
          id: 'quiet', label: '🤐 Stay quiet',
          correct: false,
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
          zh: { title: '左边有掩护！——完美呼叫！', feedback: '没错！"左边有掩护"准确告诉队友掩护来自哪里。现在他们可以选择绕过或挤过掩护——他们有了准备。好的沟通拯救了这次防守！', tip: '永远喊出掩护的方向。"左边有掩护"或"右边有掩护"——简单、大声、清晰。' } },
        {
          id: 'shoot', label: "📢 '投篮！'",
          correct: false,
          zh: { title: '错误的口令', feedback: '哇——你的队友被掩护打了个措手不及！喊"投篮"没有警告他们即将到来的掩护。掩护成功，持球者获得了空位。', tip: '只有在队友真的空位时才喊"投篮"。遇到掩护，要说"左边/右边有掩护"！' } },
        {
          id: 'quiet', label: '🤐 保持安静',
          correct: false,
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

export default communicationScenarios;
