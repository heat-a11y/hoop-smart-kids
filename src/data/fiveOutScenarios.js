/**
 * 5-Out Motion Offense — Interactive Playbook
 * Based on the official 4 progressions from basketballforcoaches.com
 *
 * The 5 spots (on the NBA 3-pt line):
 *   1. Left Corner  (45, 42)   2. Left Wing   (65, 140)
 *   3. Top          (200, 200)  4. Right Wing  (335, 140)  5. Right Corner (355, 42)
 *
 * Half-court top view: basket at (200, 32), FT line at y=132, 3-pt apex at y=192.
 * Spacing: always at the NBA 3-pt line, 5 spots always filled unless screening/cutting.
 */

const fiveOutScenarios = {
  // ─── STAGE 1: Basic Cutting (5-on-0) ────────────────────────────────────
  // Pass → basket cut to opposite corner → fill up toward the ball
  stage1: {
    id: 'stage1', half: 'top', showDefenders: false,
    en: {
      title: 'Basic Cutting (5-on-0)',
      subtitle: 'Progression 1 — Pass & Cut',
      setup: 'All 5 players start at the 5 spots on the NBA 3-point line. On a pass, the passer basket cuts through the lane and fills the opposite corner. The other players rotate to fill spots closer to the ball — this is the foundation of 5-out motion.',
      timeline: [
        { at: 0, text: '⛹️ 5-out alignment: ① Top, ② Right Wing, ③ Left Wing, ④ Right Corner, ⑤ Left Corner. All on the NBA 3-pt line.' },
        { at: 0.15, text: '🎯 ① passes to ② on the wing. ① basket cuts through the lane — hard cut to the rim!' },
        { at: 0.3, text: '✂️ ① cuts all the way through to the LEFT corner. ⑤ and ③ fill up: ⑤ → Left Wing, ③ → Top.' },
        { at: 0.45, text: '🎯 ② passes to ④ in the Right Corner. ② basket cuts through to the LEFT wing.' },
        { at: 0.6, text: '🔄 ① fills up to Left Wing. ⑤ slides to Left Corner. ③ stays at Top. Positions restored.' },
        { at: 0.78, text: '🎯 ④ passes back to ②. ④ basket cuts and replaces themself in the same corner.' },
        { at: 1.0, text: '✅ Pass, cut, fill. The paint is open because all 5 start on the 3-pt line. Rule: never stand still after a pass!' },
      ],
    },
    zh: {
      title: '基本切入（5对0）',
      subtitle: '第一阶段 — 传球与空切',
      setup: '五名球员全部站在NBA三分线上的五个位置。传球后，传球者穿过限制区空切到对侧底角。其他球员轮转补位靠近球的位置——这是5外进攻的基础。',
      timeline: [
        { at: 0, text: '⛹️ 5外站位：①弧顶、②右翼、③左翼、④右底角、⑤左底角。全在NBA三分线上。' },
        { at: 0.15, text: '🎯 ①传给②（右翼）。①穿过限制区空切——强硬切入！' },
        { at: 0.3, text: '✂️ ①切穿到左底角。⑤和③补位：⑤→左翼，③→弧顶。' },
        { at: 0.45, text: '🎯 ②传给④（右底角）。②空切到左翼。' },
        { at: 0.6, text: '🔄 ①补位到左翼。⑤滑到左底角。③留在弧顶。位置恢复。' },
        { at: 0.78, text: '🎯 ④回传给②。④空切后回到同侧底角。' },
        { at: 1.0, text: '✅ 传、切、补。限制区敞开因为全部5人都从三分线启动。规则：传球后绝不站着不动！' },
      ],
    },
    players: [
      { id: 'p1', label: '1', color: '#FF6B35',
        keyframes: [{t:0,x:200,y:200},{t:0.15,x:200,y:200},{t:0.28,x:200,y:80},{t:0.35,x:45,y:42},{t:0.45,x:45,y:42},{t:0.55,x:45,y:42},{t:0.6,x:65,y:140},{t:0.78,x:65,y:140},{t:1,x:65,y:140}] },
      { id: 'p2', label: '2', color: '#00D4FF',
        keyframes: [{t:0,x:335,y:140},{t:0.15,x:335,y:140},{t:0.28,x:335,y:140},{t:0.35,x:335,y:140},{t:0.45,x:335,y:140},{t:0.55,x:200,y:80},{t:0.6,x:65,y:140},{t:0.78,x:65,y:140},{t:1,x:65,y:140}] },
      { id: 'p3', label: '3', color: '#2ECC71',
        keyframes: [{t:0,x:65,y:140},{t:0.15,x:65,y:140},{t:0.28,x:200,y:200},{t:0.35,x:200,y:200},{t:0.45,x:200,y:200},{t:0.55,x:200,y:200},{t:0.6,x:200,y:200},{t:0.78,x:200,y:200},{t:1,x:200,y:200}] },
      { id: 'p4', label: '4', color: '#FFE135',
        keyframes: [{t:0,x:355,y:42},{t:0.15,x:355,y:42},{t:0.28,x:355,y:42},{t:0.35,x:355,y:42},{t:0.45,x:355,y:42},{t:0.55,x:355,y:42},{t:0.6,x:355,y:42},{t:0.78,x:355,y:42},{t:1,x:355,y:42}] },
      { id: 'p5', label: '5', color: '#9B59B6',
        keyframes: [{t:0,x:45,y:42},{t:0.15,x:45,y:42},{t:0.28,x:65,y:140},{t:0.35,x:65,y:140},{t:0.45,x:65,y:140},{t:0.55,x:45,y:42},{t:0.6,x:45,y:42},{t:0.78,x:45,y:42},{t:1,x:45,y:42}] },
    ],
    defenders: [],
    ball: [{t:0,x:200,y:184},{t:0.15,x:335,y:124},{t:0.28,x:335,y:124},{t:0.35,x:335,y:124},{t:0.45,x:355,y:26},{t:0.55,x:355,y:26},{t:0.6,x:65,y:124},{t:0.78,x:65,y:124},{t:1,x:65,y:124}],
    arrows: [
      { fromT: 0.15, fromX: 200, fromY: 200, toT: 0.15, toX: 335, toY: 140, color: '#2ECC71', label: 'Pass', dashed: false },
      { fromT: 0.22, fromX: 200, fromY: 200, toT: 0.35, toX: 45, toY: 42, color: '#FFE135', label: 'Basket cut', dashed: true },
      { fromT: 0.3, fromX: 45, fromY: 42, toT: 0.3, toX: 65, toY: 140, color: '#00D4FF', label: 'Fill', dashed: true },
      { fromT: 0.45, fromX: 335, fromY: 140, toT: 0.45, toX: 355, toY: 42, color: '#2ECC71', label: 'Pass', dashed: false },
      { fromT: 0.55, fromX: 335, fromY: 140, toT: 0.6, toX: 65, toY: 140, color: '#FFE135', label: 'Basket cut', dashed: true },
      { fromT: 0.78, fromX: 355, fromY: 42, toT: 0.78, toX: 65, toY: 140, color: '#2ECC71', label: 'Pass', dashed: false },
    ],
  },

  // ─── STAGE 2: Screening Away ────────────────────────────────────────────
  // Pass → set away screen for opposite side → curl to rim → pop
  stage2: {
    id: 'stage2', half: 'top', showDefenders: true,
    en: {
      title: 'Screening Away',
      subtitle: 'Progression 2 — Away Screen & Curl',
      setup: 'Instead of cutting after a pass, the passer sets an away screen for a teammate on the opposite side. The screened player curls hard to the rim looking for the pass. The screener pops back out. This creates scoring chances in the lane.',
      timeline: [
        { at: 0, text: '⛹️ 5-out set. Ball at ① Top. Defenders in man-to-man at the 3-pt line.' },
        { at: 0.15, text: '🎯 ① passes to ② on the Right Wing. Instead of cutting, ① prepares to screen away.' },
        { at: 0.3, text: '🧱 ① sets a back-screen for ③ on the left wing. Screen angle: shoulder toward the rim.' },
        { at: 0.45, text: '✂️ ③ curls hard off the screen to the rim. ③\'s defender is caught on the screen.' },
        { at: 0.6, text: '🎯 ② hits ③ cutting to the basket. ① pops back out to the top after screening.' },
        { at: 0.8, text: '🔄 ⑤ fills up to Left Wing. 3 fills Left Corner. Positions reset.' },
        { at: 1.0, text: '✅ Away screen created an open layup. The screener\'s defender couldn\'t help because of 5-out spacing!' },
      ],
    },
    zh: {
      title: '远离掩护',
      subtitle: '第二阶段 — 远离掩护与卷切',
      setup: '传球后，传球者不为空切而为一个远离侧的队友设置掩护。被掩护者强硬卷切到篮下寻找传球。掩护者弹出接球。这在限制区内创造了得分机会。',
      timeline: [
        { at: 0, text: '⛹️ 5外站位。球在①弧顶。防守人盯人站在三分线。' },
        { at: 0.15, text: '🎯 ①传给②（右翼）。①不切入，准备做远离掩护。' },
        { at: 0.3, text: '🧱 ①为左翼的③做背掩护。角度：肩膀朝向篮筐。' },
        { at: 0.45, text: '✂️ ③利用掩护强硬卷切篮下。③的防守者被掩护挡住。' },
        { at: 0.6, text: '🎯 ②传给切入的③。①掩护后弹出到弧顶。' },
        { at: 0.8, text: '🔄 ⑤补位到左翼。③补左底角。位置重置。' },
        { at: 1.0, text: '✅ 远离掩护创造了空位上篮。掩护者的防守者因5外空间无法协防！' },
      ],
    },
    players: [
      { id: 'p1', label: '1', color: '#FF6B35',
        keyframes: [{t:0,x:200,y:200},{t:0.15,x:200,y:200},{t:0.3,x:65,y:130},{t:0.45,x:65,y:130},{t:0.6,x:200,y:200},{t:0.8,x:200,y:200},{t:1,x:200,y:200}] },
      { id: 'p2', label: '2', color: '#00D4FF',
        keyframes: [{t:0,x:335,y:140},{t:0.15,x:335,y:140},{t:0.3,x:335,y:140},{t:0.45,x:335,y:130},{t:0.6,x:320,y:100},{t:0.8,x:335,y:140},{t:1,x:335,y:140}] },
      { id: 'p3', label: '3', color: '#2ECC71',
        keyframes: [{t:0,x:65,y:140},{t:0.15,x:65,y:140},{t:0.3,x:65,y:140},{t:0.45,x:140,y:80},{t:0.6,x:170,y:55},{t:0.8,x:45,y:42},{t:1,x:45,y:42}] },
      { id: 'p4', label: '4', color: '#FFE135',
        keyframes: [{t:0,x:355,y:42},{t:0.15,x:355,y:42},{t:0.3,x:355,y:42},{t:0.45,x:355,y:42},{t:0.6,x:355,y:42},{t:0.8,x:355,y:42},{t:1,x:355,y:42}] },
      { id: 'p5', label: '5', color: '#9B59B6',
        keyframes: [{t:0,x:45,y:42},{t:0.15,x:45,y:42},{t:0.3,x:45,y:42},{t:0.45,x:45,y:42},{t:0.6,x:45,y:42},{t:0.8,x:65,y:140},{t:1,x:65,y:140}] },
    ],
    defenders: [
      { id: 'd1', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:200,y:165},{t:0.15,x:200,y:165},{t:0.3,x:70,y:110},{t:0.45,x:85,y:115},{t:0.6,x:180,y:170},{t:0.8,x:190,y:175},{t:1,x:200,y:165}] },
      { id: 'd2', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:330,y:110},{t:0.15,x:330,y:110},{t:0.3,x:330,y:110},{t:0.45,x:320,y:110},{t:0.6,x:310,y:100},{t:0.8,x:320,y:110},{t:1,x:330,y:110}] },
      { id: 'd3', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:70,y:110},{t:0.15,x:70,y:110},{t:0.3,x:70,y:120},{t:0.45,x:120,y:85},{t:0.6,x:150,y:65},{t:0.8,x:50,y:55},{t:1,x:50,y:55}] },
      { id: 'd4', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:350,y:55},{t:0.15,x:350,y:55},{t:0.3,x:350,y:55},{t:0.45,x:350,y:55},{t:0.6,x:350,y:55},{t:0.8,x:350,y:55},{t:1,x:350,y:55}] },
      { id: 'd5', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:50,y:55},{t:0.15,x:50,y:55},{t:0.3,x:50,y:55},{t:0.45,x:50,y:55},{t:0.6,x:50,y:55},{t:0.8,x:65,y:110},{t:1,x:65,y:110}] },
    ],
    ball: [{t:0,x:200,y:184},{t:0.15,x:335,y:124},{t:0.3,x:335,y:124},{t:0.45,x:320,y:114},{t:0.6,x:170,y:39},{t:0.8,x:170,y:39},{t:1,x:170,y:39}],
    arrows: [
      { fromT: 0.15, fromX: 200, fromY: 200, toT: 0.15, toX: 335, toY: 140, color: '#2ECC71', label: 'Pass', dashed: false },
      { fromT: 0.25, fromX: 200, fromY: 200, toT: 0.3, toX: 65, toY: 130, color: '#FFE135', label: 'Screen', dashed: false },
      { fromT: 0.45, fromX: 65, fromY: 140, toT: 0.5, toX: 140, toY: 80, color: '#FFE135', label: 'Curl', dashed: true },
      { fromT: 0.6, fromX: 335, fromY: 130, toT: 0.6, toX: 170, toY: 55, color: '#2ECC71', label: 'Pass', dashed: false },
    ],
  },

  // ─── STAGE 3: On-Ball Screen ───────────────────────────────────────────
  // Pass → set on-ball screen → pick & roll → drive/feed
  stage3: {
    id: 'stage3', half: 'top', showDefenders: true,
    en: {
      title: 'On-Ball Screen (Pick & Roll)',
      subtitle: 'Progression 3 — Screen the Ball Handler',
      setup: 'After passing, the passer sets an on-ball screen for the receiver. The pick & roll in 5-out is deadly because the other 3 players are spaced at the 3-pt line. Help defense is extremely difficult. The ball handler reads: shoot if sagged, attack if flat, feed the roller.',
      timeline: [
        { at: 0, text: '⛹️ 5-out set. ① at Top, ② on Right Wing. Defenders in deny position.' },
        { at: 0.15, text: '🎯 ① passes to ②. ① sprints to set an on-ball screen for ②.' },
        { at: 0.3, text: '🧱 Screen set. ② uses it — ②\'s defender is caught. ①\'s defender has to help ("show").' },
        { at: 0.45, text: '🏃 ② drives hard to the rim. ① rolls to the basket after the screen.' },
        { at: 0.6, text: '👀 Help defender slides over to stop ②. ② reads it and feeds ① rolling.' },
        { at: 0.8, text: '🎯 Dump pass to ①. ③, ④, ⑤ stay spaced — their defenders can\'t leave them.' },
        { at: 1.0, text: '✅ ① scores at the rim. 5-out spacing froze the help defender — they had to choose between stopping ② or leaving their shooter.' },
      ],
    },
    zh: {
      title: '持球掩护（挡拆）',
      subtitle: '第三阶段 — 为持球者设置掩护',
      setup: '传球后，传球者为接球者设置持球掩护。5外进攻中的挡拆极为致命，因为其他3名球员都在三分线外拉开空间，协防极其困难。持球者阅读：后退就投，平站就突，换防就喂顺下。',
      timeline: [
        { at: 0, text: '⛹️ 5外站位。①弧顶，②右翼。防守者处于阻绝位置。' },
        { at: 0.15, text: '🎯 ①传给②。①冲刺去为②设置持球掩护。' },
        { at: 0.3, text: '🧱 掩护到位。②利用掩护——②的防守者被挡住。①的防守者必须协防。' },
        { at: 0.45, text: '🏃 ②强硬突破篮下。①掩护后顺下。' },
        { at: 0.6, text: '👀 协防者滑步阻止②。②阅读防守并喂球给顺下的①。' },
        { at: 0.8, text: '🎯 击地传给①。③、④、⑤保持空间——他们的防守者不能离开。' },
        { at: 1.0, text: '✅ ①篮下得分。5外空间冻结了协防者——他们必须在阻止②和放掉自己射手之间选择。' },
      ],
    },
    players: [
      { id: 'p1', label: '1', color: '#FF6B35',
        keyframes: [{t:0,x:200,y:200},{t:0.15,x:200,y:200},{t:0.3,x:335,y:130},{t:0.45,x:310,y:100},{t:0.6,x:280,y:75},{t:0.8,x:270,y:60},{t:1,x:260,y:50}] },
      { id: 'p2', label: '2', color: '#00D4FF',
        keyframes: [{t:0,x:335,y:140},{t:0.15,x:335,y:140},{t:0.3,x:335,y:140},{t:0.45,x:290,y:120},{t:0.6,x:260,y:100},{t:0.8,x:250,y:95},{t:1,x:250,y:95}] },
      { id: 'p3', label: '3', color: '#2ECC71',
        keyframes: [{t:0,x:65,y:140},{t:0.15,x:65,y:140},{t:0.3,x:65,y:140},{t:0.45,x:65,y:140},{t:0.6,x:65,y:140},{t:0.8,x:65,y:140},{t:1,x:65,y:140}] },
      { id: 'p4', label: '4', color: '#FFE135',
        keyframes: [{t:0,x:355,y:42},{t:0.15,x:355,y:42},{t:0.3,x:355,y:42},{t:0.45,x:355,y:42},{t:0.6,x:355,y:42},{t:0.8,x:355,y:42},{t:1,x:355,y:42}] },
      { id: 'p5', label: '5', color: '#9B59B6',
        keyframes: [{t:0,x:45,y:42},{t:0.15,x:45,y:42},{t:0.3,x:45,y:42},{t:0.45,x:45,y:42},{t:0.6,x:45,y:42},{t:0.8,x:45,y:42},{t:1,x:45,y:42}] },
    ],
    defenders: [
      { id: 'd1', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:200,y:165},{t:0.15,x:200,y:165},{t:0.3,x:320,y:125},{t:0.45,x:300,y:105},{t:0.6,x:275,y:85},{t:0.8,x:265,y:75},{t:1,x:260,y:65}] },
      { id: 'd2', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:330,y:110},{t:0.15,x:330,y:110},{t:0.3,x:330,y:120},{t:0.45,x:290,y:120},{t:0.6,x:265,y:105},{t:0.8,x:255,y:100},{t:1,x:250,y:100}] },
      { id: 'd3', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:70,y:110},{t:0.15,x:70,y:110},{t:0.3,x:70,y:110},{t:0.45,x:70,y:110},{t:0.6,x:70,y:110},{t:0.8,x:70,y:110},{t:1,x:70,y:110}] },
      { id: 'd4', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:350,y:55},{t:0.15,x:350,y:55},{t:0.3,x:350,y:55},{t:0.45,x:350,y:55},{t:0.6,x:350,y:55},{t:0.8,x:350,y:55},{t:1,x:350,y:55}] },
      { id: 'd5', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:50,y:55},{t:0.15,x:50,y:55},{t:0.3,x:50,y:55},{t:0.45,x:50,y:55},{t:0.6,x:50,y:55},{t:0.8,x:50,y:55},{t:1,x:50,y:55}] },
    ],
    ball: [{t:0,x:200,y:184},{t:0.15,x:335,y:124},{t:0.3,x:335,y:124},{t:0.45,x:290,y:104},{t:0.6,x:260,y:84},{t:0.8,x:270,y:44},{t:1,x:260,y:34}],
    arrows: [
      { fromT: 0.15, fromX: 200, fromY: 200, toT: 0.15, toX: 335, toY: 140, color: '#2ECC71', label: 'Pass', dashed: false },
      { fromT: 0.25, fromX: 200, fromY: 200, toT: 0.3, toX: 335, toY: 130, color: '#FFE135', label: 'Screen', dashed: false },
      { fromT: 0.45, fromX: 335, fromY: 140, toT: 0.5, toX: 290, toY: 120, color: '#00D4FF', label: 'Drive', dashed: false },
      { fromT: 0.5, fromX: 335, fromY: 130, toT: 0.5, toX: 310, toY: 100, color: '#FFE135', label: 'Roll', dashed: true },
      { fromT: 0.65, fromX: 260, fromY: 100, toT: 0.65, toX: 280, toY: 75, color: '#2ECC71', label: 'Feed', dashed: false },
    ],
  },

  // ─── STAGE 4: Dribble At ────────────────────────────────────────────────
  // Ball handler pressured → dribble at teammate → back cut or hand-off
  stage4: {
    id: 'stage4', half: 'top', showDefenders: true,
    en: {
      title: 'Dribble At & Back Cut',
      subtitle: 'Progression 4 — Escape Pressure',
      setup: 'When the ball handler is heavily pressured and passing lanes are denied, they "dribble at" a teammate. The teammate reads: if denied, back cut to the rim. If open, hand-off and attack. Rule #1: if the ball looks at you and you\'re denied, back cut immediately!',
      timeline: [
        { at: 0, text: '⛹️ 5-out set. ② on Right Wing. ②\'s defender is pressuring tight — passing lanes are denied.' },
        { at: 0.15, text: '🏃 ② can\'t pass. ② dribbles at ④ in the Right Corner — drawing ④\'s defender.' },
        { at: 0.3, text: '👀 ④\'s defender denies the pass. ④ back cuts hard to the rim (Rule #1)!' },
        { at: 0.45, text: '🎯 ② hits ④ with a pass on the back cut. Defender is beaten.' },
        { at: 0.6, text: '🏀 ④ catches in stride and attacks the rim. ⑤\'s defender slides to help.' },
        { at: 0.8, text: '👀 ④ sees help coming and kicks out to ⑤ in the Left Corner for the open 3!' },
        { at: 1.0, text: '✅ Dribble at → back cut → kick = easy offense. 5-out spacing gives the kick receiver a wide-open shot.' },
      ],
    },
    zh: {
      title: '运球逼近与反跑',
      subtitle: '第四阶段 — 破解紧逼',
      setup: '当持球者受到紧逼防守且传球路线被封锁时，他们「运球逼近」队友。队友阅读：如果被阻绝就反跑切入篮下；如果空位就手递手接球进攻。规则#1：如果持球者看你且你被阻绝，立即反跑！',
      timeline: [
        { at: 0, text: '⛹️ 5外站位。②在右翼。②的防守者紧逼——传球路线被封。' },
        { at: 0.15, text: '🏃 ②无法传球。②运球逼近④（右底角）——吸引④的防守者。' },
        { at: 0.3, text: '👀 ④的防守者阻绝传球。④反跑切向篮下（规则#1）！' },
        { at: 0.45, text: '🎯 ②传给反跑的④。防守者被击败。' },
        { at: 0.6, text: '🏀 ④接球冲击篮筐。⑤的防守者滑步协防。' },
        { at: 0.8, text: '👀 ④看到协防，分球给左底角的⑤投空位三分！' },
        { at: 1.0, text: '✅ 运球逼近 → 反跑 → 分球 = 轻松进攻。5外空间给接球者完全空位的投篮。' },
      ],
    },
    players: [
      { id: 'p1', label: '1', color: '#FF6B35',
        keyframes: [{t:0,x:200,y:200},{t:0.15,x:200,y:200},{t:0.3,x:200,y:200},{t:0.45,x:200,y:200},{t:0.6,x:200,y:200},{t:0.8,x:200,y:200},{t:1,x:200,y:200}] },
      { id: 'p2', label: '2', color: '#00D4FF',
        keyframes: [{t:0,x:335,y:140},{t:0.15,x:325,y:155},{t:0.3,x:315,y:165},{t:0.45,x:305,y:170},{t:0.6,x:305,y:170},{t:0.8,x:305,y:170},{t:1,x:305,y:170}] },
      { id: 'p3', label: '3', color: '#2ECC71',
        keyframes: [{t:0,x:65,y:140},{t:0.15,x:65,y:140},{t:0.3,x:65,y:140},{t:0.45,x:65,y:140},{t:0.6,x:65,y:140},{t:0.8,x:65,y:140},{t:1,x:65,y:140}] },
      { id: 'p4', label: '4', color: '#FFE135',
        keyframes: [{t:0,x:355,y:42},{t:0.15,x:355,y:42},{t:0.3,x:340,y:90},{t:0.45,x:270,y:80},{t:0.6,x:240,y:65},{t:0.8,x:240,y:65},{t:1,x:240,y:65}] },
      { id: 'p5', label: '5', color: '#9B59B6',
        keyframes: [{t:0,x:45,y:42},{t:0.15,x:45,y:42},{t:0.3,x:45,y:42},{t:0.45,x:45,y:42},{t:0.6,x:45,y:42},{t:0.8,x:45,y:42},{t:1,x:45,y:42}] },
    ],
    defenders: [
      { id: 'd1', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:200,y:165},{t:0.15,x:200,y:165},{t:0.3,x:200,y:165},{t:0.45,x:200,y:165},{t:0.6,x:200,y:165},{t:0.8,x:200,y:165},{t:1,x:200,y:165}] },
      { id: 'd2', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:330,y:110},{t:0.15,x:320,y:120},{t:0.3,x:310,y:130},{t:0.45,x:300,y:135},{t:0.6,x:300,y:135},{t:0.8,x:300,y:135},{t:1,x:300,y:135}] },
      { id: 'd3', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:70,y:110},{t:0.15,x:70,y:110},{t:0.3,x:70,y:110},{t:0.45,x:70,y:110},{t:0.6,x:70,y:110},{t:0.8,x:70,y:110},{t:1,x:70,y:110}] },
      { id: 'd4', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:350,y:55},{t:0.15,x:350,y:55},{t:0.3,x:330,y:85},{t:0.45,x:280,y:85},{t:0.6,x:250,y:75},{t:0.8,x:250,y:75},{t:1,x:250,y:75}] },
      { id: 'd5', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:50,y:55},{t:0.15,x:50,y:55},{t:0.3,x:50,y:55},{t:0.45,x:50,y:55},{t:0.6,x:50,y:50},{t:0.8,x:50,y:50},{t:1,x:50,y:50}] },
    ],
    ball: [{t:0,x:335,y:124},{t:0.15,x:325,y:139},{t:0.3,x:315,y:149},{t:0.45,x:270,y:64},{t:0.6,x:240,y:49},{t:0.8,x:45,y:26},{t:1,x:45,y:26}],
    arrows: [
      { fromT: 0.15, fromX: 335, fromY: 140, toT: 0.2, toX: 315, toY: 165, color: '#00D4FF', label: 'Dribble at', dashed: false },
      { fromT: 0.3, fromX: 355, fromY: 42, toT: 0.4, toX: 270, toY: 80, color: '#FFE135', label: 'Back cut', dashed: true },
      { fromT: 0.4, fromX: 315, fromY: 165, toT: 0.45, toX: 270, toY: 80, color: '#2ECC71', label: 'Pass', dashed: false },
      { fromT: 0.75, fromX: 240, fromY: 65, toT: 0.8, toX: 45, toY: 42, color: '#2ECC71', label: 'Kick', dashed: false },
    ],
  },

  // ─── STAGE 5: Full Possession ──────────────────────────────────────────
  // All 4 progressions combined in one continuous play
  stage5: {
    id: 'stage5', half: 'top', showDefenders: true,
    en: {
      title: 'Full 5-Out Possession',
      subtitle: 'Read & React — All Progressions Combined',
      setup: 'This combines all 4 progressions into one continuous possession. Basic cut → screen away → on-ball screen → dribble at. Players read the defense and choose the right action. This is the 5-out motion offense at full flow — positionless basketball.',
      timeline: [
        { at: 0, text: '⛹️ 5-out set. ① at Top, all 5 spots filled on the 3-pt line. Defenders in deny.' },
        { at: 0.1, text: '🎯 ① passes to ②. Basic cut: ① basket cuts through the lane — not open yet.' },
        { at: 0.2, text: '🔄 ① fills Left Corner. Ball swings: ② → ③ → ① in the corner.' },
        { at: 0.3, text: '🧱 ① passes to ③. Instead of cutting, ① sets an away screen for ②.' },
        { at: 0.4, text: '✂️ ② curls hard off the screen — defender fights through. No pass.' },
        { at: 0.52, text: '🎯 ③ reverses to ④ in the corner. ③ sprints to set an ON-BALL screen for ④.' },
        { at: 0.62, text: '🏃 ④ uses the screen and drives. ③ rolls. Help defense rotates.' },
        { at: 0.72, text: '👀 Drive cut off. ④ dribbles at ⑤ — back cut opportunity! Rule #1!' },
        { at: 0.85, text: '✂️ ⑤ back cuts to the rim. ④ feeds ⑤ for the layup!' },
        { at: 1.0, text: '🏆 Pass & cut → Screen away → On-ball screen → Dribble at → Score! 5-out motion offense!' },
      ],
    },
    zh: {
      title: '5外完整回合',
      subtitle: '阅读与反应 — 所有阶段结合',
      setup: '这是将所有4个阶段结合为一个连续回合。基本切入→远离掩护→持球掩护→运球逼近。球员阅读防守并选择正确的动作。这是完整流畅的5外进攻——位置无关的篮球。',
      timeline: [
        { at: 0, text: '⛹️ 5外站位。①弧顶，全部5个位置在三分线上。防守者阻绝。' },
        { at: 0.1, text: '🎯 ①传给②。基本切入：①穿过限制区——还没机会。' },
        { at: 0.2, text: '🔄 ①补左底角。球转移：②→③→①（底角）。' },
        { at: 0.3, text: '🧱 ①传给③。①不切入，改为为②做远离掩护。' },
        { at: 0.4, text: '✂️ ②卷切——防守者挤过。没传球。' },
        { at: 0.52, text: '🎯 ③传给底角④。③冲刺去为④做持球掩护。' },
        { at: 0.62, text: '🏃 ④利用掩护突破。③顺下。协防轮转。' },
        { at: 0.72, text: '👀 突破路线被堵。④运球逼近⑤——反跑时机！规则#1！' },
        { at: 0.85, text: '✂️ ⑤反跑切入篮下。④传给⑤上篮！' },
        { at: 1.0, text: '🏆 传切→远离掩护→持球掩护→运球逼近→得分！5外进攻！' },
      ],
    },
    players: [
      { id: 'p1', label: '1', color: '#FF6B35',
        keyframes: [{t:0,x:200,y:200},{t:0.1,x:200,y:200},{t:0.18,x:200,y:80},{t:0.22,x:45,y:42},{t:0.3,x:45,y:42},{t:0.35,x:65,y:130},{t:0.4,x:65,y:130},{t:0.52,x:65,y:130},{t:0.62,x:65,y:130},{t:0.72,x:65,y:130},{t:0.85,x:65,y:130},{t:1,x:65,y:130}] },
      { id: 'p2', label: '2', color: '#00D4FF',
        keyframes: [{t:0,x:335,y:140},{t:0.1,x:335,y:140},{t:0.18,x:335,y:140},{t:0.22,x:335,y:140},{t:0.3,x:335,y:140},{t:0.35,x:335,y:140},{t:0.4,x:140,y:80},{t:0.52,x:45,y:42},{t:0.62,x:45,y:42},{t:0.72,x:45,y:42},{t:0.85,x:45,y:42},{t:1,x:45,y:42}] },
      { id: 'p3', label: '3', color: '#2ECC71',
        keyframes: [{t:0,x:65,y:140},{t:0.1,x:65,y:140},{t:0.18,x:65,y:140},{t:0.22,x:200,y:200},{t:0.3,x:200,y:200},{t:0.35,x:200,y:200},{t:0.4,x:200,y:200},{t:0.52,x:200,y:200},{t:0.62,x:335,y:120},{t:0.72,x:310,y:100},{t:0.85,x:310,y:100},{t:1,x:310,y:100}] },
      { id: 'p4', label: '4', color: '#FFE135',
        keyframes: [{t:0,x:355,y:42},{t:0.1,x:355,y:42},{t:0.18,x:355,y:42},{t:0.22,x:355,y:42},{t:0.3,x:355,y:42},{t:0.35,x:355,y:42},{t:0.4,x:355,y:42},{t:0.52,x:355,y:42},{t:0.62,x:310,y:100},{t:0.72,x:280,y:140},{t:0.85,x:260,y:160},{t:1,x:260,y:160}] },
      { id: 'p5', label: '5', color: '#9B59B6',
        keyframes: [{t:0,x:45,y:42},{t:0.1,x:45,y:42},{t:0.18,x:45,y:42},{t:0.22,x:45,y:42},{t:0.3,x:45,y:42},{t:0.35,x:45,y:42},{t:0.4,x:45,y:42},{t:0.52,x:45,y:42},{t:0.62,x:45,y:42},{t:0.72,x:45,y:80},{t:0.85,x:100,y:70},{t:1,x:110,y:55}] },
    ],
    defenders: [
      { id: 'd1', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:200,y:165},{t:0.1,x:200,y:165},{t:0.18,x:200,y:165},{t:0.22,x:50,y:55},{t:0.3,x:50,y:55},{t:0.35,x:65,y:110},{t:0.4,x:85,y:110},{t:0.52,x:85,y:110},{t:0.62,x:85,y:110},{t:0.72,x:85,y:110},{t:0.85,x:85,y:110},{t:1,x:85,y:110}] },
      { id: 'd2', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:330,y:110},{t:0.1,x:330,y:110},{t:0.18,x:330,y:110},{t:0.22,x:330,y:110},{t:0.3,x:330,y:110},{t:0.35,x:330,y:110},{t:0.4,x:120,y:85},{t:0.52,x:50,y:55},{t:0.62,x:50,y:55},{t:0.72,x:50,y:55},{t:0.85,x:50,y:55},{t:1,x:50,y:55}] },
      { id: 'd3', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:70,y:110},{t:0.1,x:70,y:110},{t:0.18,x:70,y:110},{t:0.22,x:200,y:165},{t:0.3,x:200,y:165},{t:0.35,x:200,y:165},{t:0.4,x:200,y:165},{t:0.52,x:200,y:165},{t:0.62,x:320,y:120},{t:0.72,x:300,y:110},{t:0.85,x:300,y:110},{t:1,x:300,y:110}] },
      { id: 'd4', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:350,y:55},{t:0.1,x:350,y:55},{t:0.18,x:350,y:55},{t:0.22,x:350,y:55},{t:0.3,x:350,y:55},{t:0.35,x:350,y:55},{t:0.4,x:350,y:55},{t:0.52,x:350,y:55},{t:0.62,x:310,y:100},{t:0.72,x:280,y:130},{t:0.85,x:260,y:145},{t:1,x:260,y:145}] },
      { id: 'd5', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:50,y:55},{t:0.1,x:50,y:55},{t:0.18,x:50,y:55},{t:0.22,x:50,y:55},{t:0.3,x:50,y:55},{t:0.35,x:50,y:55},{t:0.4,x:50,y:55},{t:0.52,x:50,y:55},{t:0.62,x:50,y:55},{t:0.72,x:50,y:65},{t:0.85,x:90,y:75},{t:1,x:100,y:65}] },
    ],
    ball: [{t:0,x:200,y:184},{t:0.1,x:335,y:124},{t:0.18,x:335,y:124},{t:0.22,x:65,y:124},{t:0.3,x:65,y:124},{t:0.35,x:65,y:124},{t:0.4,x:65,y:124},{t:0.52,x:355,y:26},{t:0.62,x:310,y:84},{t:0.72,x:280,y:124},{t:0.85,x:100,y:54},{t:1,x:110,y:39}],
    arrows: [
      { fromT: 0.1, fromX: 200, fromY: 200, toT: 0.1, toX: 335, toY: 140, color: '#2ECC71', label: 'Pass', dashed: false },
      { fromT: 0.18, fromX: 200, fromY: 200, toT: 0.22, toX: 45, toY: 42, color: '#FFE135', label: 'Cut', dashed: true },
      { fromT: 0.22, fromX: 335, fromY: 140, toT: 0.22, toX: 65, toY: 140, color: '#2ECC71', label: 'Swing', dashed: false },
      { fromT: 0.3, fromX: 45, fromY: 42, toT: 0.3, toX: 65, toY: 130, color: '#FFE135', label: 'Screen', dashed: false },
      { fromT: 0.4, fromX: 335, fromY: 140, toT: 0.4, toX: 140, toY: 80, color: '#FFE135', label: 'Curl', dashed: true },
      { fromT: 0.52, fromX: 200, fromY: 200, toT: 0.52, toX: 355, toY: 42, color: '#2ECC71', label: 'Pass', dashed: false },
      { fromT: 0.55, fromX: 200, fromY: 200, toT: 0.62, toX: 335, toY: 120, color: '#FFE135', label: 'Screen', dashed: false },
      { fromT: 0.62, fromX: 355, fromY: 42, toT: 0.65, toX: 310, toY: 100, color: '#00D4FF', label: 'Drive', dashed: false },
      { fromT: 0.72, fromX: 280, fromY: 140, toT: 0.72, toX: 45, toY: 80, color: '#00D4FF', label: 'Dribble at', dashed: false },
      { fromT: 0.78, fromX: 45, fromY: 80, toT: 0.85, toX: 100, toY: 70, color: '#FFE135', label: 'Back cut', dashed: true },
      { fromT: 0.85, fromX: 260, fromY: 160, toT: 0.85, toX: 100, toY: 70, color: '#2ECC71', label: 'Feed', dashed: false },
    ],
  },
};

export default fiveOutScenarios;
