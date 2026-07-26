const defenseScenarios = {
  seeBallSeeMan: {
    id: 'see-ball-see-man',
    en: {
      title: 'See Ball, See Man',
      subtitle: 'Pistol Position Defense',
      setup: "Your man is one pass away from the ball. You need to be in the 'pistol position' — a triangle where you can see BOTH the ball handler and your man. Tap the correct spot on the court!",
      instruction: 'Tap the defensive position where you can see both the ball handler (🏀) and your matchup (🔵) at the same time.',
      positions: [
        { id: 'correct', x: 260, y: 170, label: '✅ Pistol', correct: true,
          en: { feedback: "Perfect! You're in the pistol position — one step off the passing lane, facing both the ball and your man. From here you can deny the pass AND help on the drive.", tip: 'Stay in a triangle: you, your man, and the ball. If you can see both, you\'re in the right spot!' } },
        { id: 'wrong1', x: 290, y: 200, label: '❌ Too close', correct: false,
          en: { feedback: "You're too close to your man! If you turn around to see the ball, you lose your man on a cut. Back up one step to see both.", tip: 'Standing right next to your man means you can\'t see the ball. Ball-you-man triangle!' } },
        { id: 'wrong2', x: 200, y: 130, label: '❌ Flat-footed', correct: false,
          en: { feedback: "You're ball-watching! Your man can backdoor cut behind you for an easy layup. Split your vision — see ball AND man.", tip: 'Never turn your back on your man. Always keep them in your peripheral vision.' } },
        { id: 'wrong3', x: 310, y: 160, label: '❌ Denial only', correct: false,
          en: { feedback: "You're overplaying the pass denial. Yes, you'll intercept the pass, but your man can back-cut and you're beat. Stay in balance!", tip: 'Over-denying opens up back cuts. Stay in the middle ground — threaten the pass, but don\'t commit.' } },
      ],
    },
    zh: {
      title: '看球看人',
      subtitle: '手枪防守位置',
      setup: '你的防守对象距离持球人一步之遥。你需要站在"手枪位置"——一个能看到持球人和你的防守对象的三角形。点击球场上正确的位置！',
      instruction: '点击既能看见持球者（🏀）又能看见你的防守对象（🔵）的防守位置。',
      positions: [
        { id: 'correct', x: 260, y: 170, label: '✅ 手枪位', correct: true,
          zh: { feedback: '完美！你站到了手枪位置——离传球路线一步，同时面向球和你的防守人。从这里你可以干扰传球，也可以协防突破。', tip: '保持三角形：你、你的防守人和球。如果你能同时看到两者，你就站在正确的位置！' } },
        { id: 'wrong1', x: 290, y: 200, label: '❌ 太近', correct: false,
          zh: { feedback: '你离防守人太近了！如果你转身看球，就会失去防守人。后退一步才能同时看到两者。', tip: '紧贴防守人意味着你看不到球。记住球-你-防守人的三角形！' } },
        { id: 'wrong2', x: 200, y: 130, label: '❌ 只看球', correct: false,
          zh: { feedback: '你只盯着球看！你的防守人可以反跑切入篮下轻松得分。分散你的视线——同时看到球和人。', tip: '永远不要把背对着你的防守人。始终让他们在你的余光中。' } },
        { id: 'wrong3', x: 310, y: 160, label: '❌ 过度抢前', correct: false,
          zh: { feedback: '你过度抢前拦截传球了。是的，你可能截到球，但你的防守人可以反跑，你就被过了！保持平衡！', tip: '过度抢前会给反跑留下空间。站在中间位置——威胁传球路线，但不要完全扑出去。' } },
      ],
    },
    diagram: {
      ballHandler: { x: 330, y: 120, label: '🏀 PG' },
      offensivePlayer: { x: 250, y: 210, label: 'SF' },
      defenderStart: { x: 250, y: 210, label: 'You' },
      teammate: { x: 120, y: 180, label: 'C' },
      otherTeammate: { x: 350, y: 280, label: 'SG' },
    },
  },

  helpRecover: {
    id: 'help-recover',
    en: {
      title: 'Help and Recover!',
      subtitle: 'Team Defense Rotation',
      setup: "Your teammate just got beaten off the dribble on the right wing! The ball handler is driving toward the basket. You're the nearest help defender. Quick — do you slide over to help, or stay on your man?",
      choices: [
        {
          id: 'help', label: '🛡️ Slide to help!',
          correct: true,
          en: { title: 'Help the team!', feedback: "YES! You slid over and cut off the driving lane. The ball handler picks up their dribble and passes out to your man — but now you have time to recover! Great team defense!", tip: 'Help defense is about timing. Slide early enough to stop the drive, but stay low so you can recover back to your man on the pass.' } },
        {
          id: 'stay', label: '👀 Stay on my man',
          correct: false,
          en: { title: 'Stayed home', feedback: "Oops! By staying on your man, you let the ball handler get an easy layup. Your teammate needed help! In team defense, we rotate and cover for each other.", tip: 'When your teammate gets beat, you become the last line of defense. Help first, then recover!' } },
      ],
    },
    zh: {
      title: '协防与回位！',
      subtitle: '团队防守轮转',
      setup: '你的队友在右侧被突破过掉了！持球者正杀向篮筐。你是最近的协防球员。快——你是滑步过去协防，还是守住你的人？',
      choices: [
        {
          id: 'help', label: '🛡️ 滑步协防！',
          correct: true,
          zh: { title: '团队协防！', feedback: '没错！你滑步过去挡住了突破路线。持球者收球并传给了你的防守人——但你现在有时间回位了！出色的团队防守！', tip: '协防的秘诀是时机。早点滑步阻止突破，但保持低重心以便在传球后迅速回位。' } },
        {
          id: 'stay', label: '👀 守住自己的人',
          correct: false,
          zh: { title: '没有协防', feedback: '哎呀！你没去协防，让持球者轻松上篮得分。你的队友需要帮助！在团队防守中，我们要轮转和互相补位。', tip: '当队友被过时，你就是最后一道防线。先协防，再回位！' } },
      ],
    },
    diagram: {
      ballHandler: { x: 250, y: 185, label: 'PG' },
      defenderBeaten: { x: 230, y: 225, label: 'Beat!' },
      helpDefender: { x: 190, y: 150, label: 'You' },
      helpDefenderMan: { x: 130, y: 130, label: 'Your Man' },
      helpPath: { from: { x: 190, y: 150 }, mid: { x: 220, y: 175 }, to: { x: 255, y: 185 }, label: 'help' },
      recoverPath: { from: { x: 255, y: 185 }, to: { x: 175, y: 140 }, label: 'recover' },
      basket: { x: 250, y: 30 },
    },
  },

  boxOut: {
    id: 'box-out',
    en: {
      title: 'Box Out Timing',
      subtitle: 'Secure the Rebound',
      setup: "A shot goes up! Your job is to box out your man and grab the rebound. Watch the ball arc toward the rim — tap 'BOX OUT' at the right moment to seal your defender behind you!",
      instruction: 'Tap the button when the ball reaches the top of its arc!',
      earlyFeedback: "Too early! You jumped the gun. Let the ball reach its peak, then make contact. Patience!",
      perfectFeedback: "PERFECT TIMING! You sealed your man behind you and secured the rebound! Coach Bear is doing a happy dance!",
      lateFeedback: "Too late! The ball already hit the rim and their player snuck in for the rebound. Anticipate the shot!",
      earlyFeedbackZh: "太早了！你着急了。让球到达最高点，然后再做动作。耐心！",
      perfectFeedbackZh: "完美时机！你把对手挡在身后并抢到了篮板！熊教练在跳庆祝舞！",
      lateFeedbackZh: "太晚了！球已经碰到篮筐，对方球员溜进来抢走了篮板。提前预判投篮！",
    },
    zh: {
      title: '卡位时机',
      subtitle: '抢下篮板',
      setup: '有人投篮了！你的任务是卡住你的对手并抢到篮板。观察球飞向篮筐的弧线——在正确的时机点击"卡位"按钮，把你的防守者挡在身后！',
      instruction: '在球到达最高点时点击按钮！',
    },
    diagram: {
      shooter: { x: 200, y: 220, label: 'Shooter' },
      defenderYou: { x: 250, y: 180, label: 'You' },
      opponent: { x: 270, y: 195, label: 'Opponent' },
      basket: { x: 250, y: 30 },
      ballArc: { start: { x: 200, y: 220 }, peak: { x: 250, y: 60 }, end: { x: 250, y: 35 } },
    },
  },
};

export default defenseScenarios;
