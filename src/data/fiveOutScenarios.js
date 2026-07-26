/**
 * 5-Out Motion Offense — Interactive Playbook
 * Based on the official 4 progressions from basketballforcoaches.com
 *
 * Each stage is a timeline of player movements with keyframes at t∈[0,1].
 * The slider scrubs through frames, interpolating player positions.
 *
 * Coordinate system: half-court top, width=400, height≈320 active.
 * Basket is near (200, -5).
 * NBA 3-pt line arc apex ≈ y=200.
 *
 * 5 spots that must always be filled:
 *   1. Left corner  2. Left wing  3. Top  4. Right wing  5. Right corner
 *
 * 5 rules:
 *   1. If denied + ball looks at you → back cut
 *   2. If you can score on your defender → attack
 *   3. Square up to the rim on catch
 *   4. Every action with purpose
 *   5. Space at NBA 3-pt line
 */

const fiveOutScenarios = {
  // ─── STAGE 1: Basic Cutting (5-on-0) ────────────────────────────────────
  // From the reference: "Progression 1 – Basic Cutting"
  // "Start by setting out 5 cones at the 5 fill spots... teach the cuts"
  // 4 types: Top→Wing, Wing→Corner, Corner→Wing, Wing→Top
  stage1: {
    id: 'stage1',
    half: 'top',
    showDefenders: false,
    en: {
      title: 'Basic Cutting (5-on-0)',
      subtitle: 'Progression 1 — Pass & Cut',
      setup: 'All 5 players start at the 5 spots on the NBA 3-point line. On a pass, the passer basket cuts through the key and fills the opposite side. The other players rotate to fill spots closer to the ball. This is the foundation of 5-out motion.',
      timeline: [
        { at: 0, text: '⛹️ 5-out alignment: Top (1), Right Wing (2), Left Wing (3), Right Corner (4), Left Corner (5). All at NBA 3-pt line.' },
        { at: 0.15, text: '🎯 Pass from Top (1) to Right Wing (2). 1 basket cuts through the key — hard cut!' },
        { at: 0.3, text: '✂️ 1 cuts all the way through to the LEFT corner. 3 and 5 fill up: 3 moves to Top, 5 moves to Left Wing.' },
        { at: 0.45, text: '🎯 2 passes to 4 in the Right Corner. 2 basket cuts through to the LEFT wing.' },
        { at: 0.6, text: '🔄 1 fills up to Left Wing. 5 slides to Left Corner. 3 stays at Top. Positions restored.' },
        { at: 0.75, text: '🎯 4 passes back to 2. 4 basket cuts and replaces themself in the same corner.' },
        { at: 1.0, text: '✅ Pass, cut, fill. The paint is open because all 5 players start outside the 3-pt line!' },
      ],
    },
    zh: {
      title: '基本切入（5对0）',
      subtitle: '第一阶段 — 传球与切入',
      setup: '五名球员全部站在NBA三分线上的五个位置。传球后，传球者穿过禁区空切到对侧。其他球员轮转补位靠近球的位置。这是5外进攻的基础。',
      timeline: [
        { at: 0, text: '⛹️ 5外站位：弧顶(1)、右翼(2)、左翼(3)、右底角(4)、左底角(5)。全在NBA三分线外。' },
        { at: 0.15, text: '🎯 从弧顶(1)传给右翼(2)。1穿过禁区空切——强硬切入！' },
        { at: 0.3, text: '✂️ 1切穿到左底角。3和5补位：3上移到弧顶，5上移到左翼。' },
        { at: 0.45, text: '🎯 2传给4（右底角）。2穿过禁区空切到左翼。' },
        { at: 0.6, text: '🔄 1补位到左翼。5滑到左底角。3留在弧顶。位置恢复。' },
        { at: 0.75, text: '🎯 4回传给2。4空切后回到同侧底角。' },
        { at: 1.0, text: '✅ 传、切、补。禁区敞开因为全部5人都从三分线外启动！' },
      ],
    },
    players: [
      { id: 'p1', label: '1', color: '#FF6B35',
        keyframes: [{t:0,x:200,y:210},{t:0.15,x:200,y:210},{t:0.28,x:200,y:90},{t:0.35,x:100,y:250},{t:0.45,x:100,y:250},{t:0.55,x:100,y:170},{t:0.6,x:90,y:170},{t:0.75,x:90,y:170},{t:1,x:90,y:170}] },
      { id: 'p2', label: '2', color: '#00D4FF',
        keyframes: [{t:0,x:310,y:170},{t:0.15,x:310,y:170},{t:0.28,x:310,y:170},{t:0.35,x:310,y:170},{t:0.45,x:310,y:170},{t:0.55,x:310,y:90},{t:0.6,x:90,y:170},{t:0.75,x:90,y:170},{t:1,x:90,y:170}] },
      { id: 'p3', label: '3', color: '#2ECC71',
        keyframes: [{t:0,x:90,y:170},{t:0.15,x:90,y:170},{t:0.28,x:200,y:210},{t:0.35,x:200,y:210},{t:0.45,x:200,y:210},{t:0.55,x:200,y:210},{t:0.6,x:200,y:210},{t:0.75,x:200,y:210},{t:1,x:200,y:210}] },
      { id: 'p4', label: '4', color: '#FFE135',
        keyframes: [{t:0,x:300,y:260},{t:0.15,x:300,y:260},{t:0.28,x:300,y:260},{t:0.35,x:300,y:260},{t:0.45,x:300,y:260},{t:0.55,x:300,y:260},{t:0.6,x:300,y:260},{t:0.75,x:300,y:260},{t:1,x:300,y:260}] },
      { id: 'p5', label: '5', color: '#9B59B6',
        keyframes: [{t:0,x:100,y:260},{t:0.15,x:100,y:260},{t:0.28,x:100,y:170},{t:0.35,x:100,y:170},{t:0.45,x:100,y:170},{t:0.55,x:100,y:260},{t:0.6,x:100,y:260},{t:0.75,x:100,y:260},{t:1,x:100,y:260}] },
    ],
    defenders: [],
    ball: [{t:0,x:200,y:194},{t:0.15,x:310,y:154},{t:0.28,x:310,y:154},{t:0.35,x:310,y:154},{t:0.45,x:300,y:244},{t:0.55,x:300,y:244},{t:0.6,x:90,y:154},{t:0.75,x:90,y:154},{t:1,x:90,y:154}],
    arrows: [
      { fromT: 0.15, fromX: 200, fromY: 210, toT: 0.15, toX: 310, toY: 170, color: '#2ECC71', label: 'Pass', dashed: false },
      { fromT: 0.22, fromX: 200, fromY: 210, toT: 0.35, toX: 100, toY: 250, color: '#FFE135', label: 'Basket cut', dashed: true },
      { fromT: 0.35, fromX: 90, fromY: 170, toT: 0.35, toX: 200, toY: 210, color: '#00D4FF', label: 'Fill', dashed: true },
      { fromT: 0.45, fromX: 310, fromY: 170, toT: 0.45, toX: 300, toY: 260, color: '#2ECC71', label: 'Pass', dashed: false },
      { fromT: 0.55, fromX: 310, fromY: 170, toT: 0.6, toX: 90, toY: 170, color: '#FFE135', label: 'Basket cut', dashed: true },
      { fromT: 0.75, fromX: 300, fromY: 260, toT: 0.75, toX: 90, toY: 170, color: '#2ECC71', label: 'Pass', dashed: false },
    ],
  },

  // ─── STAGE 2: Screening Away ────────────────────────────────────────────
  // From the reference: "Progression 2 – Screen Away"
  // After pass, instead of cutting, set an away screen.
  // Option 1: Screened player curls to the rim. Screener pops back.
  // Can be used on Top→Wing, Wing→Corner, or Wing→Top passes.
  stage2: {
    id: 'stage2',
    half: 'top',
    showDefenders: true,
    en: {
      title: 'Screening Away',
      subtitle: 'Progression 2 — Away Screen & Curl',
      setup: 'Instead of cutting after a pass, the passer sets an away screen for a teammate on the opposite side. The screened player curls hard to the rim. The screener pops back out. This creates scoring chances without forcing the defense to help.',
      timeline: [
        { at: 0, text: '⛹️ 5-out set. Ball at Top (1). Defenders in man-to-man.' },
        { at: 0.15, text: '🎯 1 passes to Right Wing (2). Instead of cutting, 1 prepares to screen away for 3.' },
        { at: 0.3, text: '🧱 1 sets a back-screen for 3 on the left wing. Angle is toward the rim.' },
        { at: 0.45, text: '✂️ 3 curls off the screen hard to the rim. 3\'s defender is fighting through.' },
        { at: 0.6, text: '🏀 2 hits 3 with a pass for the layup. 1 pops back out to top after screening.' },
        { at: 0.8, text: '🔄 5 fills up to Left Wing. 3 fills Left Corner if no shot. Positions cycle.' },
        { at: 1.0, text: '✅ Away screen created an open layup. The screener\'s defender couldn\'t help because of 5-out spacing!' },
      ],
    },
    zh: {
      title: '远离掩护',
      subtitle: '第二阶段 — 远离掩护与卷切',
      setup: '传球后，传球者不为切入而为一个远离侧的队友设置掩护。被掩护者强硬卷切到篮下。掩护者弹出接球。这在不需要协防的情况下创造了得分机会。',
      timeline: [
        { at: 0, text: '⛹️ 5外站位。球在弧顶(1)。防守人盯人。' },
        { at: 0.15, text: '🎯 1传给右翼(2)。1不切入，准备为3做远离掩护。' },
        { at: 0.3, text: '🧱 1为左翼的3做背掩护。角度朝向篮筐。' },
        { at: 0.45, text: '✂️ 3利用掩护卷切到篮下。3的防守者正在挤过掩护。' },
        { at: 0.6, text: '🏀 2传给3上篮。1掩护后弹出到弧顶。' },
        { at: 0.8, text: '🔄 5补位到左翼。如果没投，3补左底角。位置轮转。' },
        { at: 1.0, text: '✅ 远离掩护创造了空位上篮。掩护者的防守者因5外空间无法协防！' },
      ],
    },
    players: [
      { id: 'p1', label: '1', color: '#FF6B35',
        keyframes: [{t:0,x:200,y:210},{t:0.15,x:200,y:210},{t:0.3,x:90,y:160},{t:0.45,x:90,y:160},{t:0.6,x:200,y:210},{t:0.8,x:200,y:210},{t:1,x:200,y:210}] },
      { id: 'p2', label: '2', color: '#00D4FF',
        keyframes: [{t:0,x:310,y:170},{t:0.15,x:310,y:170},{t:0.3,x:310,y:170},{t:0.45,x:310,y:160},{t:0.6,x:300,y:140},{t:0.8,x:300,y:140},{t:1,x:310,y:170}] },
      { id: 'p3', label: '3', color: '#2ECC71',
        keyframes: [{t:0,x:90,y:170},{t:0.15,x:90,y:170},{t:0.3,x:90,y:170},{t:0.45,x:160,y:100},{t:0.6,x:180,y:80},{t:0.8,x:100,y:260},{t:1,x:100,y:260}] },
      { id: 'p4', label: '4', color: '#FFE135',
        keyframes: [{t:0,x:300,y:260},{t:0.15,x:300,y:260},{t:0.3,x:300,y:260},{t:0.45,x:300,y:260},{t:0.6,x:300,y:260},{t:0.8,x:300,y:260},{t:1,x:300,y:260}] },
      { id: 'p5', label: '5', color: '#9B59B6',
        keyframes: [{t:0,x:100,y:260},{t:0.15,x:100,y:260},{t:0.3,x:100,y:260},{t:0.45,x:100,y:260},{t:0.6,x:100,y:260},{t:0.8,x:90,y:170},{t:1,x:90,y:170}] },
    ],
    defenders: [
      { id: 'd1', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:200,y:170},{t:0.15,x:200,y:170},{t:0.3,x:90,y:130},{t:0.45,x:110,y:130},{t:0.6,x:180,y:160},{t:0.8,x:180,y:180},{t:1,x:200,y:170}] },
      { id: 'd2', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:310,y:130},{t:0.15,x:310,y:130},{t:0.3,x:310,y:130},{t:0.45,x:300,y:130},{t:0.6,x:290,y:130},{t:0.8,x:290,y:130},{t:1,x:310,y:130}] },
      { id: 'd3', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:90,y:130},{t:0.15,x:90,y:130},{t:0.3,x:90,y:140},{t:0.45,x:130,y:110},{t:0.6,x:160,y:90},{t:0.8,x:100,y:220},{t:1,x:100,y:220}] },
      { id: 'd4', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:300,y:220},{t:0.15,x:300,y:220},{t:0.3,x:300,y:220},{t:0.45,x:300,y:220},{t:0.6,x:300,y:220},{t:0.8,x:300,y:220},{t:1,x:300,y:220}] },
      { id: 'd5', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:100,y:220},{t:0.15,x:100,y:220},{t:0.3,x:100,y:220},{t:0.45,x:100,y:220},{t:0.6,x:100,y:220},{t:0.8,x:90,y:140},{t:1,x:90,y:140}] },
    ],
    ball: [{t:0,x:200,y:194},{t:0.15,x:310,y:154},{t:0.3,x:310,y:154},{t:0.45,x:300,y:144},{t:0.6,x:180,y:64},{t:0.8,x:180,y:64},{t:1,x:180,y:64}],
    arrows: [
      { fromT: 0.15, fromX: 200, fromY: 210, toT: 0.15, toX: 310, toY: 170, color: '#2ECC71', label: 'Pass', dashed: false },
      { fromT: 0.25, fromX: 200, fromY: 210, toT: 0.3, toX: 90, toY: 160, color: '#FFE135', label: 'Screen', dashed: false },
      { fromT: 0.45, fromX: 90, fromY: 170, toT: 0.5, toX: 160, toY: 100, color: '#FFE135', label: 'Curl', dashed: true },
      { fromT: 0.6, fromX: 310, fromY: 160, toT: 0.6, toX: 180, toY: 80, color: '#2ECC71', label: 'Pass', dashed: false },
    ],
  },

  // ─── STAGE 3: On-Ball Screen ───────────────────────────────────────────
  // From the reference: "Progression 3 – On-Ball Screen"
  // After a pass, the passer sets an on-ball screen.
  // Pick & roll with 5-out spacing. 3 players not in the action space out.
  // Can be used after any pass.
  stage3: {
    id: 'stage3',
    half: 'top',
    showDefenders: true,
    en: {
      title: 'On-Ball Screen (Pick & Roll)',
      subtitle: 'Progression 3 — Screen the Ball Handler',
      setup: 'After passing, the passer sets an on-ball screen for the receiver. The pick & roll in 5-out is deadly because the other 3 players are spaced at the 3-pt line, making help defense difficult. The ball handler reads the defense and attacks.',
      timeline: [
        { at: 0, text: '⛹️ 5-out set. Ball at Top (1). Defenders are tight.' },
        { at: 0.15, text: '🎯 1 passes to Right Wing (2). 1 immediately moves to set an on-ball screen.' },
        { at: 0.3, text: '🧱 1 sets the screen. 2\'s defender gets caught. 2 uses the screen.' },
        { at: 0.45, text: '🏃 2 drives hard to the rim. 1 rolls to the basket — their defender helps on 2.' },
        { at: 0.6, text: '👀 Help defender slides over. 2 reads it: dump pass to the rolling 1!' },
        { at: 0.8, text: '🎯 2 feeds 1. 3, 4, 5 stay spaced — their defenders can\'t help.' },
        { at: 1.0, text: '✅ 1 lays it in. 5-out spacing made the help defender choose between stopping 2 or leaving their shooter open.' },
      ],
    },
    zh: {
      title: '持球掩护（挡拆）',
      subtitle: '第三阶段 — 为持球者掩护',
      setup: '传球后，传球者为接球者设置持球掩护。5外进攻中的挡拆非常致命，因为其他3名球员都在三分线外拉开空间，协防变得极其困难。持球者阅读防守并进攻。',
      timeline: [
        { at: 0, text: '⛹️ 5外站位。球在弧顶(1)。防守紧逼。' },
        { at: 0.15, text: '🎯 1传给右翼(2)。1立即移动去设置持球掩护。' },
        { at: 0.3, text: '🧱 1设置掩护。2的防守者被挡住。2利用掩护。' },
        { at: 0.45, text: '🏃 2强硬突破到篮下。1顺下——1的防守者去协防2。' },
        { at: 0.6, text: '👀 协防者滑步过来。2阅读防守：击地传给顺下的1！' },
        { at: 0.8, text: '🎯 2传给1。3、4、5保持空间——他们的防守者无法协防。' },
        { at: 1.0, text: '✅ 1轻松上篮。5外空间迫使协防者必须在阻止2和放掉自己射手之间选择。' },
      ],
    },
    players: [
      { id: 'p1', label: '1', color: '#FF6B35',
        keyframes: [{t:0,x:200,y:210},{t:0.15,x:200,y:210},{t:0.3,x:310,y:150},{t:0.45,x:300,y:120},{t:0.6,x:280,y:90},{t:0.8,x:270,y:70},{t:1,x:270,y:60}] },
      { id: 'p2', label: '2', color: '#00D4FF',
        keyframes: [{t:0,x:310,y:170},{t:0.15,x:310,y:170},{t:0.3,x:310,y:170},{t:0.45,x:280,y:140},{t:0.6,x:260,y:110},{t:0.8,x:250,y:100},{t:1,x:250,y:100}] },
      { id: 'p3', label: '3', color: '#2ECC71',
        keyframes: [{t:0,x:90,y:170},{t:0.15,x:90,y:170},{t:0.3,x:90,y:170},{t:0.45,x:90,y:170},{t:0.6,x:90,y:170},{t:0.8,x:90,y:170},{t:1,x:90,y:170}] },
      { id: 'p4', label: '4', color: '#FFE135',
        keyframes: [{t:0,x:300,y:260},{t:0.15,x:300,y:260},{t:0.3,x:300,y:260},{t:0.45,x:300,y:260},{t:0.6,x:300,y:260},{t:0.8,x:300,y:260},{t:1,x:300,y:260}] },
      { id: 'p5', label: '5', color: '#9B59B6',
        keyframes: [{t:0,x:100,y:260},{t:0.15,x:100,y:260},{t:0.3,x:100,y:260},{t:0.45,x:100,y:260},{t:0.6,x:100,y:260},{t:0.8,x:100,y:260},{t:1,x:100,y:260}] },
    ],
    defenders: [
      { id: 'd1', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:200,y:170},{t:0.15,x:200,y:170},{t:0.3,x:300,y:155},{t:0.45,x:290,y:130},{t:0.6,x:280,y:110},{t:0.8,x:270,y:90},{t:1,x:270,y:80}] },
      { id: 'd2', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:310,y:130},{t:0.15,x:310,y:130},{t:0.3,x:310,y:140},{t:0.45,x:290,y:140},{t:0.6,x:270,y:120},{t:0.8,x:260,y:110},{t:1,x:260,y:110}] },
      { id: 'd3', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:90,y:130},{t:0.15,x:90,y:130},{t:0.3,x:90,y:130},{t:0.45,x:90,y:130},{t:0.6,x:90,y:130},{t:0.8,x:90,y:130},{t:1,x:90,y:130}] },
      { id: 'd4', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:300,y:220},{t:0.15,x:300,y:220},{t:0.3,x:300,y:220},{t:0.45,x:300,y:220},{t:0.6,x:300,y:220},{t:0.8,x:300,y:220},{t:1,x:300,y:220}] },
      { id: 'd5', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:100,y:220},{t:0.15,x:100,y:220},{t:0.3,x:100,y:220},{t:0.45,x:100,y:220},{t:0.6,x:100,y:220},{t:0.8,x:100,y:220},{t:1,x:100,y:220}] },
    ],
    ball: [{t:0,x:200,y:194},{t:0.15,x:310,y:154},{t:0.3,x:310,y:154},{t:0.45,x:280,y:124},{t:0.6,x:260,y:94},{t:0.8,x:270,y:54},{t:1,x:270,y:44}],
    arrows: [
      { fromT: 0.15, fromX: 200, fromY: 210, toT: 0.15, toX: 310, toY: 170, color: '#2ECC71', label: 'Pass', dashed: false },
      { fromT: 0.25, fromX: 200, fromY: 210, toT: 0.3, toX: 310, toY: 150, color: '#FFE135', label: 'Screen', dashed: false },
      { fromT: 0.45, fromX: 310, fromY: 170, toT: 0.5, toX: 280, toY: 140, color: '#00D4FF', label: 'Drive', dashed: false },
      { fromT: 0.6, fromX: 310, fromY: 150, toT: 0.6, toX: 280, toY: 90, color: '#FFE135', label: 'Roll', dashed: true },
      { fromT: 0.7, fromX: 260, fromY: 110, toT: 0.7, toX: 280, toY: 90, color: '#2ECC71', label: 'Feed', dashed: false },
    ],
  },

  // ─── STAGE 4: Dribble At ────────────────────────────────────────────────
  // From the reference: "Progression 4 – Dribble At"
  // When pressured, dribble towards another player.
  // Option 1: Back cut (if defender denies)
  // Option 2: Hand-off
  stage4: {
    id: 'stage4',
    half: 'top',
    showDefenders: true,
    en: {
      title: 'Dribble At & Back Cut',
      subtitle: 'Progression 4 — Escape Pressure',
      setup: 'When the ball handler is heavily pressured and passing lanes are denied, they can "dribble at" a teammate. The teammate reads the defense: if their defender denies, they back cut to the rim. If not, they take a hand-off and attack. This keeps the offense moving.',
      timeline: [
        { at: 0, text: '⛹️ 5-out set. 2 at Right Wing is being heavily pressured by defender.' },
        { at: 0.15, text: '🏃 2 can\'t pass — all lanes denied. 2 dribbles at 4 in the corner.' },
        { at: 0.3, text: '👀 4\'s defender denies the pass. 4 back cuts hard to the rim!' },
        { at: 0.45, text: '🎯 2 hits 4 with the pass on the back cut. Defender beat.' },
        { at: 0.6, text: '🏀 4 catches in stride and attacks the rim. 5\'s defender slides to help.' },
        { at: 0.8, text: '🎯 4 kicks out to 5 in the corner for the open 3!' },
        { at: 1.0, text: '✅ Dribble at + back cut = easy offense. Rule #1: if denied AND ball looks at you, back cut!' },
      ],
    },
    zh: {
      title: '运球逼近与反跑',
      subtitle: '第四阶段 — 破解紧逼',
      setup: '当持球者受到紧逼防守且传球路线被封锁时，他们可以\"运球逼近\"队友。队友阅读防守：如果防守者阻止接球就反跑切入篮下，否则手递手接球进攻。这保持进攻流畅。',
      timeline: [
        { at: 0, text: '⛹️ 5外站位。2在右翼受到防守者紧逼。' },
        { at: 0.15, text: '🏃 2无法传球——所有路线被封锁。2运球逼近4（底角）。' },
        { at: 0.3, text: '👀 4的防守者阻止接球。4反跑切入篮下！' },
        { at: 0.45, text: '🎯 2传给反跑的4。防守者被击败。' },
        { at: 0.6, text: '🏀 4接球冲击篮筐。5的防守者滑步协防。' },
        { at: 0.8, text: '🎯 4分球给底角的5投空位三分！' },
        { at: 1.0, text: '✅ 运球逼近 + 反跑 = 轻松进攻。规则#1：如果被阻止接球且持球者看你，立即反跑！' },
      ],
    },
    players: [
      { id: 'p1', label: '1', color: '#FF6B35',
        keyframes: [{t:0,x:200,y:210},{t:0.15,x:200,y:210},{t:0.3,x:200,y:210},{t:0.45,x:200,y:210},{t:0.6,x:200,y:210},{t:0.8,x:200,y:210},{t:1,x:200,y:210}] },
      { id: 'p2', label: '2', color: '#00D4FF',
        keyframes: [{t:0,x:310,y:170},{t:0.15,x:300,y:190},{t:0.3,x:290,y:210},{t:0.45,x:280,y:220},{t:0.6,x:280,y:220},{t:0.8,x:280,y:220},{t:1,x:280,y:220}] },
      { id: 'p3', label: '3', color: '#2ECC71',
        keyframes: [{t:0,x:90,y:170},{t:0.15,x:90,y:170},{t:0.3,x:90,y:170},{t:0.45,x:90,y:170},{t:0.6,x:90,y:170},{t:0.8,x:90,y:170},{t:1,x:90,y:170}] },
      { id: 'p4', label: '4', color: '#FFE135',
        keyframes: [{t:0,x:300,y:260},{t:0.15,x:300,y:260},{t:0.3,x:300,y:230},{t:0.45,x:250,y:130},{t:0.6,x:230,y:100},{t:0.8,x:230,y:100},{t:1,x:230,y:100}] },
      { id: 'p5', label: '5', color: '#9B59B6',
        keyframes: [{t:0,x:100,y:260},{t:0.15,x:100,y:260},{t:0.3,x:100,y:260},{t:0.45,x:100,y:260},{t:0.6,x:100,y:260},{t:0.8,x:100,y:260},{t:1,x:100,y:260}] },
    ],
    defenders: [
      { id: 'd1', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:200,y:170},{t:0.15,x:200,y:170},{t:0.3,x:200,y:170},{t:0.45,x:200,y:170},{t:0.6,x:200,y:170},{t:0.8,x:200,y:170},{t:1,x:200,y:170}] },
      { id: 'd2', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:310,y:130},{t:0.15,x:300,y:150},{t:0.3,x:290,y:170},{t:0.45,x:280,y:180},{t:0.6,x:270,y:180},{t:0.8,x:270,y:180},{t:1,x:270,y:180}] },
      { id: 'd3', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:90,y:130},{t:0.15,x:90,y:130},{t:0.3,x:90,y:130},{t:0.45,x:90,y:130},{t:0.6,x:90,y:130},{t:0.8,x:90,y:130},{t:1,x:90,y:130}] },
      { id: 'd4', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:300,y:220},{t:0.15,x:300,y:220},{t:0.3,x:300,y:210},{t:0.45,x:260,y:150},{t:0.6,x:240,y:120},{t:0.8,x:240,y:120},{t:1,x:240,y:120}] },
      { id: 'd5', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:100,y:220},{t:0.15,x:100,y:220},{t:0.3,x:100,y:220},{t:0.45,x:100,y:220},{t:0.6,x:100,y:210},{t:0.8,x:100,y:200},{t:1,x:100,y:200}] },
    ],
    ball: [{t:0,x:310,y:154},{t:0.15,x:300,y:174},{t:0.3,x:290,y:194},{t:0.45,x:250,y:114},{t:0.6,x:230,y:84},{t:0.8,x:100,y:244},{t:1,x:100,y:244}],
    arrows: [
      { fromT: 0.15, fromX: 310, fromY: 170, toT: 0.2, toX: 300, toY: 230, color: '#00D4FF', label: 'Dribble at', dashed: false },
      { fromT: 0.3, fromX: 300, fromY: 230, toT: 0.45, toX: 250, toY: 130, color: '#FFE135', label: 'Back cut', dashed: true },
      { fromT: 0.4, fromX: 290, fromY: 210, toT: 0.45, toX: 250, toY: 130, color: '#2ECC71', label: 'Pass', dashed: false },
      { fromT: 0.8, fromX: 230, fromY: 100, toT: 0.8, toX: 100, toY: 260, color: '#2ECC71', label: 'Kick', dashed: false },
    ],
  },

  // ─── STAGE 5: Full Possession (Mix Everything) ──────────────────────────
  // Combines all 4 progressions in one fluid possession:
  // Basic cut → Screen away → On-ball screen → Dribble at
  // Shows the continuity and read-and-react nature of 5-out.
  stage5: {
    id: 'stage5',
    half: 'top',
    showDefenders: true,
    en: {
      title: 'Full 5-Out Possession',
      subtitle: 'Read & React — All Progressions Combined',
      setup: 'This combines all 4 progressions into one continuous possession. Watch how the offense flows: basic pass & cut, then screen away, then on-ball screen, then dribble at. Players read the defense and choose the right action. This is the 5-out motion offense in full flow.',
      timeline: [
        { at: 0, text: '⛹️ 5-out set. Ball at Top (1). Defenders ready.' },
        { at: 0.1, text: '🎯 1 passes to Right Wing (2). Basic cut: 1 basket cuts through — not open.' },
        { at: 0.2, text: '🔄 1 fills Left Corner. Ball swings: 2 → 3 → 1.' },
        { at: 0.3, text: '🧱 1 passes to 3. Instead of cutting, 1 sets an away screen for 2.' },
        { at: 0.4, text: '✂️ 2 curls off the screen — defender fights through. No pass.' },
        { at: 0.5, text: '🎯 3 passes to 4 in the corner. 3 sets an ON-BALL screen for 4.' },
        { at: 0.62, text: '🧱 4 uses the on-ball screen and drives. 3 rolls. Help rotates.' },
        { at: 0.72, text: '👀 4\'s drive is cut off. 4 dribbles at 5 — back cut time!' },
        { at: 0.85, text: '✂️ 5 back cuts to the rim. 4 feeds 5 for the layup!' },
        { at: 1.0, text: '🏆 5 scores! Pass & cut → Screen away → On-ball screen → Dribble at → back cut bucket. 5-out motion!' },
      ],
    },
    zh: {
      title: '5外完整回合',
      subtitle: '阅读与反应 — 所有阶段结合',
      setup: '这是将所有4个阶段结合为一个连续回合。观察进攻如何流动：基本传切、远离掩护、持球掩护、运球逼近。球员阅读防守并选择正确的动作。这就是完整的5外进攻。',
      timeline: [
        { at: 0, text: '⛹️ 5外站位。球在弧顶(1)。防守准备好。' },
        { at: 0.1, text: '🎯 1传给右翼(2)。基本切入：1穿过禁区——没机会。' },
        { at: 0.2, text: '🔄 1补左底角。球转移：2 → 3 → 1。' },
        { at: 0.3, text: '🧱 1传给3。1不切入，改为为2做远离掩护。' },
        { at: 0.4, text: '✂️ 2卷切——防守者挤过。没传球。' },
        { at: 0.5, text: '🎯 3传给底角4。3为4设置持球掩护。' },
        { at: 0.62, text: '🧱 4利用持球掩护突破。3顺下。协防轮转。' },
        { at: 0.72, text: '👀 4突破路线被堵。4运球逼近5——反跑时机！' },
        { at: 0.85, text: '✂️ 5反跑切入篮下。4传给5上篮！' },
        { at: 1.0, text: '🏆 5得分！传切→远离掩护→持球掩护→运球逼近→反跑得分。5外进攻！' },
      ],
    },
    players: [
      { id: 'p1', label: '1', color: '#FF6B35',
        keyframes: [{t:0,x:200,y:210},{t:0.1,x:200,y:210},{t:0.18,x:200,y:90},{t:0.22,x:100,y:250},{t:0.3,x:100,y:250},{t:0.35,x:90,y:160},{t:0.4,x:90,y:160},{t:0.5,x:90,y:160},{t:0.62,x:90,y:160},{t:0.72,x:90,y:160},{t:0.85,x:90,y:160},{t:1,x:90,y:160}] },
      { id: 'p2', label: '2', color: '#00D4FF',
        keyframes: [{t:0,x:310,y:170},{t:0.1,x:310,y:170},{t:0.18,x:310,y:170},{t:0.22,x:310,y:170},{t:0.3,x:310,y:170},{t:0.35,x:310,y:170},{t:0.4,x:160,y:100},{t:0.5,x:100,y:260},{t:0.62,x:100,y:260},{t:0.72,x:100,y:260},{t:0.85,x:100,y:260},{t:1,x:100,y:260}] },
      { id: 'p3', label: '3', color: '#2ECC71',
        keyframes: [{t:0,x:90,y:170},{t:0.1,x:90,y:170},{t:0.18,x:90,y:170},{t:0.22,x:200,y:210},{t:0.3,x:200,y:210},{t:0.35,x:200,y:210},{t:0.4,x:200,y:210},{t:0.5,x:200,y:210},{t:0.62,x:300,y:140},{t:0.72,x:290,y:120},{t:0.85,x:290,y:120},{t:1,x:290,y:120}] },
      { id: 'p4', label: '4', color: '#FFE135',
        keyframes: [{t:0,x:300,y:260},{t:0.1,x:300,y:260},{t:0.18,x:300,y:260},{t:0.22,x:300,y:260},{t:0.3,x:300,y:260},{t:0.35,x:300,y:260},{t:0.4,x:300,y:260},{t:0.5,x:300,y:260},{t:0.62,x:280,y:210},{t:0.72,x:270,y:190},{t:0.85,x:260,y:170},{t:1,x:260,y:170}] },
      { id: 'p5', label: '5', color: '#9B59B6',
        keyframes: [{t:0,x:100,y:260},{t:0.1,x:100,y:260},{t:0.18,x:100,y:260},{t:0.22,x:100,y:260},{t:0.3,x:100,y:260},{t:0.35,x:100,y:260},{t:0.4,x:100,y:260},{t:0.5,x:100,y:260},{t:0.62,x:100,y:260},{t:0.72,x:100,y:240},{t:0.85,x:130,y:110},{t:1,x:140,y:90}] },
    ],
    defenders: [
      { id: 'd1', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:200,y:170},{t:0.1,x:200,y:170},{t:0.18,x:200,y:170},{t:0.22,x:100,y:220},{t:0.3,x:100,y:220},{t:0.35,x:90,y:140},{t:0.4,x:110,y:140},{t:0.5,x:110,y:140},{t:0.62,x:110,y:140},{t:0.72,x:110,y:140},{t:0.85,x:110,y:140},{t:1,x:110,y:140}] },
      { id: 'd2', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:310,y:130},{t:0.1,x:310,y:130},{t:0.18,x:310,y:130},{t:0.22,x:310,y:130},{t:0.3,x:310,y:130},{t:0.35,x:310,y:130},{t:0.4,x:140,y:110},{t:0.5,x:100,y:220},{t:0.62,x:100,y:220},{t:0.72,x:100,y:220},{t:0.85,x:100,y:220},{t:1,x:100,y:220}] },
      { id: 'd3', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:90,y:130},{t:0.1,x:90,y:130},{t:0.18,x:90,y:130},{t:0.22,x:200,y:170},{t:0.3,x:200,y:170},{t:0.35,x:200,y:170},{t:0.4,x:200,y:170},{t:0.5,x:200,y:170},{t:0.62,x:300,y:140},{t:0.72,x:290,y:130},{t:0.85,x:290,y:130},{t:1,x:290,y:130}] },
      { id: 'd4', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:300,y:220},{t:0.1,x:300,y:220},{t:0.18,x:300,y:220},{t:0.22,x:300,y:220},{t:0.3,x:300,y:220},{t:0.35,x:300,y:220},{t:0.4,x:300,y:220},{t:0.5,x:300,y:220},{t:0.62,x:280,y:200},{t:0.72,x:270,y:190},{t:0.85,x:260,y:180},{t:1,x:260,y:180}] },
      { id: 'd5', label: 'D', color: '#EF4444',
        keyframes: [{t:0,x:100,y:220},{t:0.1,x:100,y:220},{t:0.18,x:100,y:220},{t:0.22,x:100,y:220},{t:0.3,x:100,y:220},{t:0.35,x:100,y:220},{t:0.4,x:100,y:220},{t:0.5,x:100,y:220},{t:0.62,x:100,y:220},{t:0.72,x:100,y:210},{t:0.85,x:120,y:130},{t:1,x:130,y:110}] },
    ],
    ball: [{t:0,x:200,y:194},{t:0.1,x:310,y:154},{t:0.18,x:310,y:154},{t:0.22,x:90,y:154},{t:0.3,x:90,y:154},{t:0.35,x:90,y:154},{t:0.4,x:90,y:154},{t:0.5,x:300,y:244},{t:0.62,x:280,y:194},{t:0.72,x:270,y:174},{t:0.85,x:130,y:94},{t:1,x:140,y:74}],
    arrows: [
      { fromT: 0.1, fromX: 200, fromY: 210, toT: 0.1, toX: 310, toY: 170, color: '#2ECC71', label: 'Pass', dashed: false },
      { fromT: 0.18, fromX: 200, fromY: 210, toT: 0.22, toX: 100, toY: 250, color: '#FFE135', label: 'Cut', dashed: true },
      { fromT: 0.22, fromX: 310, fromY: 170, toT: 0.22, toX: 90, toY: 170, color: '#2ECC71', label: 'Swing', dashed: false },
      { fromT: 0.3, fromX: 100, fromY: 250, toT: 0.3, toX: 90, toY: 160, color: '#FFE135', label: 'Screen', dashed: false },
      { fromT: 0.4, fromX: 310, fromY: 170, toT: 0.4, toX: 160, toY: 100, color: '#FFE135', label: 'Curl', dashed: true },
      { fromT: 0.5, fromX: 200, fromY: 210, toT: 0.5, toX: 300, toY: 260, color: '#2ECC71', label: 'Pass', dashed: false },
      { fromT: 0.55, fromX: 200, fromY: 210, toT: 0.62, toX: 300, toY: 140, color: '#FFE135', label: 'Screen', dashed: false },
      { fromT: 0.62, fromX: 300, fromY: 260, toT: 0.65, toX: 280, toY: 210, color: '#00D4FF', label: 'Drive', dashed: false },
      { fromT: 0.72, fromX: 270, fromY: 190, toT: 0.72, toX: 100, toY: 240, color: '#00D4FF', label: 'Dribble at', dashed: false },
      { fromT: 0.78, fromX: 100, fromY: 240, toT: 0.85, toX: 130, toY: 110, color: '#FFE135', label: 'Back cut', dashed: true },
      { fromT: 0.85, fromX: 260, fromY: 170, toT: 0.85, toX: 130, toY: 110, color: '#2ECC71', label: 'Feed', dashed: false },
    ],
  },
};

export default fiveOutScenarios;
