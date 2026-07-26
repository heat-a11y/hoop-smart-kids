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

export default offenseScenarios;
