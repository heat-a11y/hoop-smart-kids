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

          position: { x: 80, y: 272 },
          animate: [
            { target: 'helpDefender', to: { x: 255, y: 185 }, label: '🛡️ Help!', color: '#2ECC71' },
            { target: 'ballHandler', to: { x: 250, y: 175 }, label: '⏳ Picks up', color: '#EF4444' },
          ],
          en: { title: 'Help the team!', feedback: "YES! You slid over and cut off the driving lane. The ball handler picks up their dribble and passes out to your man — but now you have time to recover! Great team defense!", tip: 'Help defense is about timing. Slide early enough to stop the drive, but stay low so you can recover back to your man on the pass.' } },
        {
          id: 'stay', label: '👀 Stay on my man',
          correct: false,

          position: { x: 200, y: 272 },
          animate: [
            { target: 'ballHandler', to: { x: 250, y: 150 }, label: '🏀 Easy layup!', color: '#EF4444' },
            { target: 'helpDefender', to: { x: 190, y: 150 }, label: '👀 Stays put', color: '#EF4444' },
          ],
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

          position: { x: 320, y: 272 },
          animate: [
            { target: 'helpDefender', to: { x: 255, y: 185 }, label: '🛡️ 协防！', color: '#2ECC71' },
            { target: 'ballHandler', to: { x: 250, y: 175 }, label: '⏳ 收球', color: '#EF4444' },
          ],
          zh: { title: '团队协防！', feedback: '没错！你滑步过去挡住了突破路线。持球者收球并传给了你的防守人——但你现在有时间回位了！出色的团队防守！', tip: '协防的秘诀是时机。早点滑步阻止突破，但保持低重心以便在传球后迅速回位。' } },
        {
          id: 'stay', label: '👀 守住自己的人',
          correct: false,

          position: { x: 80, y: 272 },
          animate: [
            { target: 'ballHandler', to: { x: 250, y: 150 }, label: '🏀 轻松上篮！', color: '#EF4444' },
            { target: 'helpDefender', to: { x: 190, y: 150 }, label: '👀 没动', color: '#EF4444' },
          ],
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
      basket: { x: 250, y: 12 },
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
      basket: { x: 250, y: 12 },
      ballArc: { start: { x: 200, y: 220 }, peak: { x: 250, y: 60 }, end: { x: 250, y: 35 } },
    },
  },
};

const NEW_DEFENSE_SCENARIOS = {
  closeout: {
    id: 'closeout',
    en: {
      title: 'Closeout with Control',
      subtitle: 'Balance Speed and Containment',
      setup: "You're recovering to a shooter on the wing who just caught the ball. You're closing out hard. What's the right way to approach to contest the shot without getting blown by?",
      choices: [
        { id: 'A', label: 'Sprint close, chop step, high hand', correct: true,

          position: { x: 200, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 260, y: 200 }, label: '🏃 Sprint & chop!', color: '#2ECC71' },
            { target: 'ballHandler', to: { x: 300, y: 220 }, label: '🏀 Contested', color: '#FFE135' },
          ],
          en: { title: 'Textbook closeout!', feedback: "Perfect! Sprint toward the shooter, then chop your feet to decelerate 6 feet away, and raise a high hand to contest. You're close enough to affect the shot but balanced enough to stay in front of a drive.", tip: 'Sprint, chop, contest. Never jump at a shooter — stay on your feet and use your length!' } },
        { id: 'B', label: 'Jog over, stay low', correct: false,

          position: { x: 320, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 230, y: 200 }, label: '🐢 Jogging', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 300, y: 200 }, label: '🏀 Open shot!', color: '#EF4444' },
          ],
          en: { title: 'Too slow!', feedback: "Jogging gives the shooter all day to catch, aim, and shoot. By the time you arrive, the ball is already in the air. A good shooter will punish lazy closeouts every time.", tip: 'Closeout speed matters. Make the shooter feel your presence early.' } },
        { id: 'C', label: 'Full sprint, jump at shooter', correct: false,

          position: { x: 80, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 290, y: 205 }, label: '🛫 Jumped!', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 300, y: 220 }, label: '🧢 Pump fake', color: '#EF4444' },
          ],
          en: { title: 'Fouled!', feedback: "Jumping at a shooter is how you get faked into the air and give up an easy drive, OR you land on them and give up three free throws. Stay grounded and contest with verticality.", tip: 'Stay down. A pump fake only works if you leave your feet.' } },
      ],
    },
    zh: {
      title: '控制性扑防',
      subtitle: '平衡速度与防守位置',
      setup: '你在回防一个刚在侧翼接球的射手。你全力扑防。怎样才是正确的接近方式——既能干扰投篮又不会被突破？',
      choices: [
        { id: 'A', label: '冲刺、碎步减速、举手干扰', correct: true,

          position: { x: 200, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 260, y: 200 }, label: '🏃 冲刺碎步！', color: '#2ECC71' },
            { target: 'ballHandler', to: { x: 300, y: 220 }, label: '🏀 受干扰', color: '#FFE135' },
          ],
          zh: { title: '教科书式扑防！', feedback: '完美！先冲刺靠近射手，然后在6英尺处用碎步减速，举起一只手干扰。你离得够近可以影响投篮，又保持平衡不会被突破。', tip: '冲刺、碎步、干扰。永远不要跳向射手——保持站立用臂展干扰！' } },
        { id: 'B', label: '慢跑过去，保持低重心', correct: false,

          position: { x: 320, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 230, y: 200 }, label: '🐢 慢跑', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 300, y: 200 }, label: '🏀 空位出手！', color: '#EF4444' },
          ],
          zh: { title: '太慢了！', feedback: '慢跑给了射手充足的时间接球、瞄准和投篮。等你到了，球已经出手了。好的射手会惩罚每一次懒散的扑防。', tip: '扑防速度很重要。让射手早点感受到你的存在。' } },
        { id: 'C', label: '全速冲刺，跳向射手', correct: false,

          position: { x: 80, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 290, y: 205 }, label: '🛫 跳了！', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 300, y: 220 }, label: '🧢 假动作', color: '#EF4444' },
          ],
          zh: { title: '犯规了！', feedback: '跳向射手会让你被假动作晃飞，让出突破路线，或者落在射手身上送三次罚球。保持地面，用垂直起跳干扰。', tip: '保持在地面。假动作只有在你起跳时才有用。' } },
      ],
    },
    diagram: {
      ballHandler: { x: 300, y: 220, label: 'Shooter' },
      defender1: { x: 160, y: 170, label: 'You' },
      teammate1: { x: 200, y: 260, label: 'PG' },
    },
  },

  defendScreen: {
    id: 'defend-screen',
    en: {
      title: 'Defend the Pick & Roll',
      subtitle: 'Choose Your Defense',
      setup: "Your man sets a ball screen for their teammate at the top of the key. The ball handler is a great shooter but not a great passer. Your teammate fights over the screen. What do YOU need to do as the screener's defender?",
      choices: [
        { id: 'A', label: 'Show hard then recover', correct: true,

          position: { x: 200, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 200, y: 220 }, label: '🛑 Shows hard!', color: '#2ECC71' },
            { target: 'ballHandler', to: { x: 200, y: 230 }, label: '⏳ Hesitates', color: '#FFE135' },
          ],
          en: { title: 'Show & Recover!', feedback: "Right! You 'show' your body to the ball handler to slow them down while your teammate recovers over the screen, then you sprint back to your man (the roller). This is standard pick & roll defense!", tip: 'Show hard enough to slow the ball handler, but recover fast so the roller isn\'t open.' } },
        { id: 'B', label: 'Switch onto the ball handler', correct: false,

          position: { x: 320, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 200, y: 240 }, label: '🔄 Switches', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 200, y: 250 }, label: '🏃 PG drives!', color: '#EF4444' },
          ],
          en: { title: 'Bad matchup', feedback: "Switching puts your big man on their quick guard — that's a mismatch they'll exploit. Only switch when both defenders can guard both positions, or as a surprise tactic.", tip: 'Avoid switching if it creates a size/speed mismatch. Communicate the switch if you do!' } },
        { id: 'C', label: 'Sag off and protect the paint', correct: false,

          position: { x: 80, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 200, y: 210 }, label: '📏 Sags off', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 200, y: 240 }, label: '🏀 Open 3!', color: '#EF4444' },
          ],
          en: { title: 'Too much space', feedback: 'Sagging off gives the ball handler too much space. A good shooter will pull up for three. You need to at least show to discourage the shot while your teammate recovers.', tip: 'Even a brief hesitation from showing gives your teammate time to recover. Don\'t just sag off.' } },
      ],
    },
    zh: {
      title: '防守挡拆',
      subtitle: '选择防守方式',
      setup: '你的队友在弧顶被对手设置了持球掩护。持球者是个出色的射手但不擅长传球。你的队友从掩护上方绕过。作为掩护者的防守者，你需要做什么？',
      choices: [
        { id: 'A', label: '强力展示后回位', correct: true,

          position: { x: 200, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 200, y: 220 }, label: '🛑 强力展示！', color: '#2ECC71' },
            { target: 'ballHandler', to: { x: 200, y: 230 }, label: '⏳ 犹豫', color: '#FFE135' },
          ],
          zh: { title: '展示并回位！', feedback: '对！你向持球者"展示"你的身体来延缓他们，等你的队友绕过掩护后，你迅速回防你的防守对象（顺下者）。这是标准的挡拆防守！', tip: '展示要足够强硬以延缓持球者，但回位要快以免顺下者空位。' } },
        { id: 'B', label: '换防到持球者', correct: false,

          position: { x: 320, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 200, y: 240 }, label: '🔄 换防', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 200, y: 250 }, label: '🏃 小打大！', color: '#EF4444' },
          ],
          zh: { title: '错位不利', feedback: '换防会让你的大个子去防对方的快速后卫——这是他们会利用的错位。只有当两个防守者都能防两个位置时才换防，或作为奇招使用。', tip: '如果换防会造成大小/快慢错位，避免换防。如果换防一定要沟通！' } },
        { id: 'C', label: '后退保护禁区', correct: false,

          position: { x: 80, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 200, y: 210 }, label: '📏 后退', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 200, y: 240 }, label: '🏀 空位三分！', color: '#EF4444' },
          ],
          zh: { title: '空间太大', feedback: '后退给持球者太多空间。好的射手会直接投三分。你至少需要展示一下来阻止投篮，同时给你的队友回位时间。', tip: '即使是短暂的展示犹豫也能给你的队友争取回位时间。不要直接后退。' } },
      ],
    },
    diagram: {
      ballHandler: { x: 200, y: 240, label: 'PG' },
      teammate1: { x: 200, y: 180, label: 'Your Man' },
      defender1: { x: 190, y: 200, label: 'You' },
      defender2: { x: 200, y: 150, label: 'Teammate' },
    },
  },

  denyPass: {
    id: 'deny-pass',
    en: {
      title: 'Deny the Passing Lane',
      subtitle: 'On-Ball Denial Defense',
      setup: "Your man is one pass away, and the ball handler is looking to make the entry pass. You need to deny the pass while staying in help position. Where should your feet and hands be?",
      choices: [
        { id: 'A', label: 'Jab step toward the passing lane, one hand up', correct: true,

          position: { x: 200, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 290, y: 190 }, label: '✋ Deny!', color: '#2ECC71' },
            { target: 'ballHandler', to: { x: 330, y: 140 }, label: '⏳ Hesitates', color: '#FFE135' },
          ],
          en: { title: 'Perfect denial stance!', feedback: "YES! You're in the passing lane with your near hand up and your body angled to see both the ball and your man. The passer hesitates — you've successfully taken away the pass. That's elite defense!", tip: 'Get in the passing lane early. Make the passer think twice. One pass away = deny the pass first.' } },
        { id: 'B', label: 'Stand directly behind your man', correct: false,

          position: { x: 320, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 250, y: 210 }, label: '🔄 Behind', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 330, y: 140 }, label: '🎯 Easy pass!', color: '#EF4444' },
          ],
          en: { title: 'Too easy!', feedback: "Playing behind your man lets them catch the ball easily. Now they're facing the basket with options. You want to make every catch difficult, especially near the scoring areas.", tip: 'Front your man in the post. Deny on the wing. Make every catch a battle.' } },
        { id: 'C', label: 'Sag all the way into the paint', correct: false,

          position: { x: 80, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 250, y: 170 }, label: '📏 Too deep', color: '#EF4444' },
            { target: 'teammate1', to: { x: 250, y: 220 }, label: '🏀 Open catch!', color: '#EF4444' },
          ],
          en: { title: 'Too much space', feedback: "Sagging into the paint gives up the easy catch on the wing. A good offensive player will catch and shoot before you can close out. You're out of position.", tip: 'Stay close enough to contest, far enough to help. The pistol position is your friend.' } },
      ],
    },
    zh: {
      title: '拦截传球路线',
      subtitle: '有球侧防守',
      setup: '你的防守对象距离持球人一步之遥，持球者正在寻找传球机会。你需要拦截传球同时保持协防位置。你的脚和手应该在哪里？',
      choices: [
        { id: 'A', label: '刺步向传球路线，单手举起', correct: true,

          position: { x: 200, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 290, y: 190 }, label: '✋ 拦截！', color: '#2ECC71' },
            { target: 'ballHandler', to: { x: 330, y: 140 }, label: '⏳ 犹豫', color: '#FFE135' },
          ],
          zh: { title: '完美的拦截姿势！', feedback: '没错！你站在传球路线上，近侧手举起，身体角度能看到球和你的防守人。传球者犹豫了——你成功阻止了传球。这就是精英级防守！', tip: '早一步站在传球路线上。让传球者三思。距离球一步 = 先拦截传球。' } },
        { id: 'B', label: '站在防守对象身后', correct: false,

          position: { x: 320, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 250, y: 210 }, label: '🔄 在后面', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 330, y: 140 }, label: '🎯 轻松传球！', color: '#EF4444' },
          ],
          zh: { title: '太轻松了！', feedback: '站在防守对象身后让他们轻松接球。现在他们面对篮筐有多种选择。你要让每次接球都变得困难，尤其是在得分区域附近。', tip: '在低位绕前防守。在侧翼拦截传球。让每次接球都变成战斗。' } },
        { id: 'C', label: '后退到禁区', correct: false,

          position: { x: 80, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 250, y: 170 }, label: '📏 太深了', color: '#EF4444' },
            { target: 'teammate1', to: { x: 250, y: 220 }, label: '🏀 轻松接球！', color: '#EF4444' },
          ],
          zh: { title: '空间太大', feedback: '后退到禁区让对手在侧翼轻松接球。好的进攻球员会在你扑防之前接球投篮。你失去了防守位置。', tip: '保持既能干扰的距离，又能协防的距离。手枪位置是你的朋友。' } },
      ],
    },
    diagram: {
      ballHandler: { x: 330, y: 140, label: 'PG' },
      teammate1: { x: 250, y: 220, label: 'Your Man' },
      defender1: { x: 280, y: 180, label: 'You' },
    },
  },

  helpRotate: {
    id: 'help-rotate',
    en: {
      title: 'Help Side Rotation',
      subtitle: 'Weak Side Team Defense',
      setup: "The ball is on the right wing. You're on the left (weak) side, two passes away. Your teammate is guarding the ball handler closely. Where should you be positioned to provide help defense?",
      choices: [
        { id: 'A', label: 'One step inside the paint, ball-you-man triangle', correct: true,

          position: { x: 200, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 230, y: 180 }, label: '🎯 Help side!', color: '#2ECC71' },
            { target: 'ballHandler', to: { x: 320, y: 200 }, label: '👀 Sees D', color: '#FFE135' },
          ],
          en: { title: 'Perfect help position!', feedback: "Exactly! You're in the 'help side' position — one step inside the paint, angled so you can see both the ball and your man. From here you can help on a drive AND recover to your shooter.", tip: 'Help side = one foot in the paint, eyes on the ball, know where your man is.' } },
        { id: 'B', label: 'Stand on the three-point line next to your man', correct: false,

          position: { x: 320, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 180, y: 210 }, label: '📏 Too far', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 280, y: 170 }, label: '🏀 Drives past!', color: '#EF4444' },
          ],
          en: { title: 'No help available', feedback: "You're too far from the paint to help. If the ball handler drives, by the time you arrive they've already scored.", tip: 'If you can\'t touch the paint with your help side foot, you\'re too far.' } },
        { id: 'C', label: 'Sag all the way to the baseline', correct: false,

          position: { x: 80, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 230, y: 230 }, label: '📉 Out of play', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 280, y: 170 }, label: '🏀 Drives!', color: '#EF4444' },
          ],
          en: { title: 'Out of the play', feedback: "You've taken yourself completely out of the play. The ball handler can drive without worrying about you, and your man is wide open.", tip: 'Don\'t hide on defense. Be in a position to help AND recover.' } },
      ],
    },
    zh: {
      title: '弱侧协防轮转',
      subtitle: '弱侧团队防守',
      setup: '球在右侧翼位。你在左侧（弱侧），距离球两传之遥。你的队友在紧贴持球者。你应该站在什么位置来提供协防？',
      choices: [
        { id: 'A', label: '禁区边缘一步，球-你-人三角形', correct: true,

          position: { x: 200, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 230, y: 180 }, label: '🎯 协防侧！', color: '#2ECC71' },
            { target: 'ballHandler', to: { x: 320, y: 200 }, label: '👀 看到防守', color: '#FFE135' },
          ],
          zh: { title: '完美的协防位置！', feedback: '没错！你站在协防侧位置——禁区里一步，身体角度能看到球和你的防守人。从这里你可以协防突破，也可以回防你的射手。', tip: '协防侧 = 一只脚在禁区里，眼睛看球，知道你的防守人在哪。' } },
        { id: 'B', label: '站在三分线外你的防守人旁边', correct: false,

          position: { x: 320, y: 272 },
          zh: { title: '无法协防', feedback: '你离禁区太远无法协防。如果持球者突破，等你到了他们已经在得分了。', tip: '如果你的协防侧脚够不到禁区，你就太远了。' } },
        { id: 'C', label: '后退到底线', correct: false,

          position: { x: 80, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 230, y: 230 }, label: '📉 出局了', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 280, y: 170 }, label: '🏀 突破！', color: '#EF4444' },
          ],
          zh: { title: '被排除在防守外', feedback: '你完全把自己排除在防守之外了。持球者可以毫无顾虑地突破，你的防守人在弱侧完全空位。', tip: '不要在防守中躲藏。站在既能协防又能回位的位置。' } },
      ],
    },
    diagram: {
      ballHandler: { x: 320, y: 200, label: 'PG' },
      teammate1: { x: 150, y: 210, label: 'Your Man' },
      defender1: { x: 250, y: 190, label: 'You' },
      defender2: { x: 310, y: 160, label: 'Teammate' },
    },
  },

  contest: {
    id: 'contest',
    en: {
      title: 'Contest Without Fouling',
      subtitle: 'Verticality and Discipline',
      setup: "Your man catches the ball in the paint and goes up for a shot. You're right there with them. How do you contest the shot without picking up a foul?",
      choices: [
        { id: 'A', label: 'Jump straight up, arms vertical, no body contact', correct: true,

          position: { x: 200, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 200, y: 130 }, label: '🧱 Vertical!', color: '#2ECC71' },
            { target: 'ballHandler', to: { x: 200, y: 150 }, label: '🚫 Contested!', color: '#FFE135' },
          ],
          en: { title: 'Clean contest!', feedback: "Perfect verticality! You jumped straight up with both arms raised — no forward lean, no body contact. This is the legal way to contest any shot in the paint.", tip: 'Verticality = jump straight up. Don\'t jump forward. Let the shooter initiate contact.' } },
        { id: 'B', label: 'Swat from behind', correct: false,

          position: { x: 320, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 200, y: 140 }, label: '✋ Reaching!', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 200, y: 150 }, label: '❌ And-1!', color: '#EF4444' },
          ],
          en: { title: 'Foul!', feedback: "Reaching from behind almost always results in body contact or arm slapping. It's a foul 9 times out of 10.", tip: 'Don\'t reach from behind. Either contest from the side or take the charge.' } },
        { id: 'C', label: 'Slap the floor and yell', correct: false,

          position: { x: 80, y: 272 },
          animate: [
            { target: 'ballHandler', to: { x: 200, y: 130 }, label: '🏀 Easy bucket!', color: '#EF4444' },
          ],
          en: { title: 'Does nothing!', feedback: "Slapping the floor and yelling might look cool, but it doesn't actually contest the shot. Get your hand up and challenge the ball.", tip: 'Look cool by getting a block, not slapping the floor. Contest the shot first.' } },
      ],
    },
    zh: {
      title: '不犯规的干扰',
      subtitle: '垂直起跳与纪律',
      setup: '你的防守人在禁区内接球并起跳投篮。你就在他们身边。如何干扰投篮而不犯规？',
      choices: [
        { id: 'A', label: '垂直起跳，双臂竖直，无身体接触', correct: true,

          position: { x: 200, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 200, y: 130 }, label: '🧱 垂直起跳！', color: '#2ECC71' },
            { target: 'ballHandler', to: { x: 200, y: 150 }, label: '🚫 被干扰！', color: '#FFE135' },
          ],
          zh: { title: '干净的干扰！', feedback: '完美的垂直起跳！你垂直起跳双手高举——没有前倾，没有身体接触。这是在禁区干扰投篮的合法方式。', tip: '垂直起跳 = 跳直。不要向前跳。让投篮者制造接触。' } },
        { id: 'B', label: '从身后封盖', correct: false,

          position: { x: 320, y: 272 },
          animate: [
            { target: 'defender1', to: { x: 200, y: 140 }, label: '✋ 打手！', color: '#EF4444' },
            { target: 'ballHandler', to: { x: 200, y: 150 }, label: '❌ 2+1！', color: '#EF4444' },
          ],
          zh: { title: '犯规！', feedback: '从身后伸手几乎总是导致身体接触或打手。十次有九次是犯规。', tip: '不要从身后伸手。要么从侧面干扰，要么造进攻犯规。' } },
        { id: 'C', label: '拍地板大喊', correct: false,

          position: { x: 80, y: 272 },
          animate: [
            { target: 'ballHandler', to: { x: 200, y: 130 }, label: '🏀 轻松得分', color: '#EF4444' },
          ],
          zh: { title: '没用！', feedback: '拍地板大喊看起来很酷，但实际上干扰不了投篮。举起手来挑战投篮。', tip: '通过盖帽来看起来很酷，而不是拍地板。先干扰投篮。' } },
      ],
    },
    diagram: {
      ballHandler: { x: 200, y: 150, label: 'Shooter' },
      defender1: { x: 180, y: 125, label: 'You' },
      teammate1: { x: 280, y: 220, label: 'PG' },
    },
  },
};

const allDefenseScenarios = { ...defenseScenarios, ...NEW_DEFENSE_SCENARIOS };
export default allDefenseScenarios;
