/**
 * Man-to-Man Defense — Interactive Playbook
 * Two scenarios: Full-court pressure + Half-court shell defense
 *
 * Full-court: half='top' (no shift), coords 0-640 (full court)
 *   Top basket y=32, Half court y=320, Bottom basket y=612
 * Half-court: half='bottom' (auto +320), coords 0-320
 *   Basket y=32, FT line y=132, 3pt apex y=192
 */

const manToManScenarios = {
  // ══════════════════════════════════════════════════════════════════════
  // SCENARIO 1: Full-Court Man-to-Man Defense
  // Defense picks up offense bringing ball up from bottom
  // ══════════════════════════════════════════════════════════════════════
  fullCourt: {
    id: 'fullCourt',
    half: 'top',
    showDefenders: true,
    en: {
      title: 'Full-Court Man-to-Man Defense',
      subtitle: 'Pick Up Early — Pressure & Contain',
      setup: 'In full-court man-to-man, each defender picks up their man early (before half court). The goal is to slow the offense, force the ball to one side, and prevent easy entry into the frontcourt. On-ball pressure, one-pass-away deny, and two-pass-away help — all apply from baseline to baseline.',
      timeline: [
        { at: 0, text: '⛹️ Offense brings ball up. Defense gets set — D1 at half court, D2–D5 in gap/help positions.' },
        { at: 0.14, text: '🏃 PG crosses half court. D1 picks up early — pressures the ball, forces to the right wing.' },
        { at: 0.28, text: '🎯 Pass to SG on the right wing. D2 closes out under control — hand up, stay between man and basket.' },
        { at: 0.42, text: '✋ One pass away = deny! D3 denies the pass to SF. D4 and D5 sag toward the paint (two passes away).' },
        { at: 0.57, text: '🏃 SG drives baseline. D2 stays attached. D4 slides over for help — stops penetration.' },
        { at: 0.72, text: '🔄 Ball reversed back to the top. D1 recovers to ball. Defenders shift — everyone can see man and ball.' },
        { at: 0.86, text: '⛹️ Ball at top of the key. Defense in solid shell — gaps closed, all 5 in help positions.' },
        { at: 1.0, text: '✅ Full-court defense successful! Offense forced to slow down and settle. Transition into half-court defense.' },
      ],
    },
    zh: {
      title: '全场人盯人防守',
      subtitle: '早期压迫 — 施压与限制',
      setup: '全场人盯人防守中，每个防守者尽早（过半场前）找到自己的人。目标是延缓进攻、将球逼到一侧、阻止轻松进入前场。持球压迫、一臂之遥阻绝、两臂之遥协防——全场适用。',
      timeline: [
        { at: 0, text: '⛹️ 进攻方运球推进。防守方就位 — D1在中场，D2–D5在空隙/协防位置。' },
        { at: 0.14, text: '🏃 控卫过半场。D1早期压迫 — 施压持球者，逼向右侧。' },
        { at: 0.28, text: '🎯 传球给右侧分卫。D2控制性扑防 — 举手，保持在人和篮筐之间。' },
        { at: 0.42, text: '✋ 一臂之遥=阻绝！D3阻绝传给小前锋的路线。D4和D5向禁区回收（两臂之遥）。' },
        { at: 0.57, text: '🏃 分卫底线突破。D2贴防。D4滑步协防 — 阻止突破。' },
        { at: 0.72, text: '🔄 球回传弧顶。D1回到持球者身前。防守者轮转 — 所有人同时看到人和球。' },
        { at: 0.86, text: '⛹️ 球在弧顶。防守阵型稳固 — 空隙关闭，全部5人在协防位置。' },
        { at: 1.0, text: '✅ 全场防守成功！进攻被迫减速，进入半场防守。' },
      ],
    },
    players: [
      { id: 'o1', label: 'PG', color: '#3B82F6',
        keyframes: [{t:0,x:200,y:560},{t:0.14,x:200,y:340},{t:0.28,x:200,y:340},{t:0.42,x:200,y:340},{t:0.57,x:200,y:340},{t:0.72,x:200,y:250},{t:0.86,x:200,y:200},{t:1.0,x:200,y:200}] },
      { id: 'o2', label: 'SG', color: '#3B82F6',
        keyframes: [{t:0,x:300,y:540},{t:0.14,x:300,y:350},{t:0.28,x:310,y:320},{t:0.42,x:300,y:300},{t:0.57,x:280,y:280},{t:0.72,x:320,y:210},{t:0.86,x:320,y:210},{t:1.0,x:320,y:210}] },
      { id: 'o3', label: 'SF', color: '#3B82F6',
        keyframes: [{t:0,x:100,y:540},{t:0.14,x:100,y:350},{t:0.28,x:100,y:350},{t:0.42,x:100,y:350},{t:0.57,x:100,y:350},{t:0.72,x:80,y:210},{t:0.86,x:80,y:210},{t:1.0,x:80,y:210}] },
      { id: 'o4', label: 'PF', color: '#3B82F6',
        keyframes: [{t:0,x:320,y:580},{t:0.14,x:320,y:400},{t:0.28,x:320,y:400},{t:0.42,x:320,y:400},{t:0.57,x:320,y:400},{t:0.72,x:300,y:300},{t:0.86,x:300,y:200},{t:1.0,x:300,y:180}] },
      { id: 'o5', label: 'C', color: '#3B82F6',
        keyframes: [{t:0,x:80,y:580},{t:0.14,x:80,y:400},{t:0.28,x:80,y:400},{t:0.42,x:80,y:400},{t:0.57,x:80,y:400},{t:0.72,x:100,y:300},{t:0.86,x:100,y:200},{t:1.0,x:100,y:180}] },
    ],
    defenders: [
      { id: 'd1', label: 'D1', color: '#EF4444',
        keyframes: [{t:0,x:200,y:330},{t:0.14,x:200,y:325},{t:0.28,x:195,y:325},{t:0.42,x:195,y:325},{t:0.57,x:195,y:325},{t:0.72,x:200,y:230},{t:0.86,x:200,y:180},{t:1.0,x:200,y:170}] },
      { id: 'd2', label: 'D2', color: '#EF4444',
        keyframes: [{t:0,x:300,y:300},{t:0.14,x:305,y:310},{t:0.28,x:310,y:305},{t:0.42,x:305,y:290},{t:0.57,x:280,y:275},{t:0.72,x:315,y:200},{t:0.86,x:315,y:195},{t:1.0,x:315,y:195}] },
      { id: 'd3', label: 'D3', color: '#EF4444',
        keyframes: [{t:0,x:95,y:300},{t:0.14,x:95,y:310},{t:0.28,x:95,y:330},{t:0.42,x:95,y:330},{t:0.57,x:95,y:330},{t:0.72,x:80,y:195},{t:0.86,x:80,y:195},{t:1.0,x:80,y:195}] },
      { id: 'd4', label: 'D4', color: '#EF4444',
        keyframes: [{t:0,x:320,y:270},{t:0.14,x:320,y:270},{t:0.28,x:320,y:280},{t:0.42,x:320,y:300},{t:0.57,x:295,y:280},{t:0.72,x:295,y:240},{t:0.86,x:290,y:175},{t:1.0,x:290,y:165}] },
      { id: 'd5', label: 'D5', color: '#EF4444',
        keyframes: [{t:0,x:80,y:270},{t:0.14,x:80,y:270},{t:0.28,x:80,y:280},{t:0.42,x:80,y:300},{t:0.57,x:80,y:300},{t:0.72,x:95,y:240},{t:0.86,x:100,y:175},{t:1.0,x:100,y:165}] },
    ],
    ball: [{t:0,x:200,y:544},{t:0.14,x:200,y:324},{t:0.28,x:310,y:304},{t:0.42,x:300,y:284},{t:0.57,x:280,y:264},{t:0.72,x:260,y:220},{t:0.86,x:200,y:184},{t:1.0,x:200,y:184}],
    arrows: [
      { fromT: 0.14, fromX: 200, fromY: 340, toT: 0.14, toX: 200, toY: 325, color: '#FFE135', label: '🎯 Pick up', dashed: false },
      { fromT: 0.28, fromX: 200, fromY: 340, toT: 0.28, toX: 310, toY: 320, color: '#2ECC71', label: 'Pass', dashed: false },
      { fromT: 0.33, fromX: 310, fromY: 305, toT: 0.33, toX: 310, toY: 305, color: '#00D4FF', label: 'Closeout', dashed: false },
      { fromT: 0.42, fromX: 95, fromY: 330, toT: 0.42, toX: 100, toY: 350, color: '#FFE135', label: 'Deny ✋', dashed: true },
      { fromT: 0.55, fromX: 320, fromY: 300, toT: 0.55, toX: 295, toY: 280, color: '#FFE135', label: 'Help 🛡️', dashed: true },
      { fromT: 0.72, fromX: 280, fromY: 280, toT: 0.72, toX: 200, toY: 250, color: '#2ECC71', label: 'Reversal', dashed: false },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════
  // SCENARIO 2: Half-Court Man-to-Man Defense (Shell)
  // Uses half='bottom' — child coords 0-320, shifted +320
  // ══════════════════════════════════════════════════════════════════════
  halfCourt: {
    id: 'halfCourt',
    half: 'bottom',
    showDefenders: true,
    en: {
      title: 'Half-Court Man-to-Man Defense',
      subtitle: 'Shell Principles — Deny, Help & Recover',
      setup: 'In the half court, man-to-man defense follows shell principles. On-ball defender pressures. One pass away = deny (arm in the passing lane, see your man AND the ball). Two passes away = help (sag toward the paint, close the gap). Everyone communicates and shifts together.',
      timeline: [
        { at: 0, text: '⛹️ Shell set. PG at top, SG right wing, SF left wing, PF right corner, C left corner. Defense reads.' },
        { at: 0.14, text: '🏃 D1 pressures PG. D2 denies SG (one pass away). D3 denies SF. D4 and D5 sag (two passes away).' },
        { at: 0.28, text: '🎯 Pass to SG on right wing. D2 closes out under control — high hand, stay low in stance.' },
        { at: 0.42, text: '🏃 SG drives baseline. D2 stays attached. D4 helps from the corner — stops the drive.' },
        { at: 0.57, text: '🔄 SG kicks out to PF in the corner. D4 recovers to contest. D3 rotates to help.' },
        { at: 0.72, text: '🎯 Skip pass from PF back to PG at the top. D1 closes out. Defense rotates back.' },
        { at: 0.86, text: '🛡️ Ball back at top. All defenders in shell position — gaps closed, hands active.' },
        { at: 1.0, text: '✅ Half-court man defense complete! Principles: pressure → deny → help → recover. Every time.' },
      ],
    },
    zh: {
      title: '半场人盯人防守',
      subtitle: '防守壳原则 — 阻绝、协防与回位',
      setup: '在半场防守中，人盯人防守遵循防守壳原则。持球者施压。一臂之遥=阻绝（手臂在传球路线上，同时看到人和球）。两臂之遥=协防（向禁区回收，关闭空隙）。所有人一起轮转和沟通。',
      timeline: [
        { at: 0, text: '⛹️ 防守壳站位。控卫弧顶、分卫右翼、小前左翼、大前右底、中锋左底。防守方阅读。' },
        { at: 0.14, text: '🏃 D1施压控卫。D2阻绝分卫（一臂之遥）。D3阻绝小前。D4和D5回收（两臂之遥）。' },
        { at: 0.28, text: '🎯 传球给右翼分卫。D2控制性扑防——高举一手，低重心。' },
        { at: 0.42, text: '🏃 分卫底线突破。D2贴防。D4从底角协防——阻止突破。' },
        { at: 0.57, text: '🔄 分卫分球给底角大前。D4回位干扰。D3轮转协防。' },
        { at: 0.72, text: '🎯 大前跳传回弧顶控卫。D1扑防。防守轮转回位。' },
        { at: 0.86, text: '🛡️ 球回弧顶。所有防守者在壳位置——空隙关闭，手部活跃。' },
        { at: 1.0, text: '✅ 半场人盯人完成！原则：压迫→阻绝→协防→回位。每次都一样。' },
      ],
    },
    players: [
      { id: 'o1', label: 'PG', color: '#3B82F6',
        keyframes: [{t:0,x:200,y:200},{t:0.14,x:200,y:200},{t:0.28,x:200,y:200},{t:0.42,x:200,y:200},{t:0.57,x:200,y:200},{t:0.72,x:200,y:200},{t:0.86,x:200,y:200},{t:1.0,x:200,y:200}] },
      { id: 'o2', label: 'SG', color: '#3B82F6',
        keyframes: [{t:0,x:310,y:140},{t:0.14,x:310,y:140},{t:0.28,x:310,y:140},{t:0.42,x:280,y:120},{t:0.57,x:280,y:120},{t:0.72,x:310,y:140},{t:0.86,x:310,y:140},{t:1.0,x:310,y:140}] },
      { id: 'o3', label: 'SF', color: '#3B82F6',
        keyframes: [{t:0,x:90,y:140},{t:0.14,x:90,y:140},{t:0.28,x:90,y:140},{t:0.42,x:90,y:140},{t:0.57,x:90,y:140},{t:0.72,x:90,y:140},{t:0.86,x:90,y:140},{t:1.0,x:90,y:140}] },
      { id: 'o4', label: 'PF', color: '#3B82F6',
        keyframes: [{t:0,x:340,y:42},{t:0.14,x:340,y:42},{t:0.28,x:340,y:42},{t:0.42,x:340,y:42},{t:0.57,x:340,y:42},{t:0.72,x:340,y:42},{t:0.86,x:340,y:42},{t:1.0,x:340,y:42}] },
      { id: 'o5', label: 'C', color: '#3B82F6',
        keyframes: [{t:0,x:60,y:42},{t:0.14,x:60,y:42},{t:0.28,x:60,y:42},{t:0.42,x:60,y:42},{t:0.57,x:60,y:42},{t:0.72,x:60,y:42},{t:0.86,x:60,y:42},{t:1.0,x:60,y:42}] },
    ],
    defenders: [
      { id: 'd1', label: 'D1', color: '#EF4444',
        keyframes: [{t:0,x:200,y:170},{t:0.14,x:200,y:170},{t:0.28,x:200,y:170},{t:0.42,x:200,y:170},{t:0.57,x:200,y:170},{t:0.72,x:200,y:170},{t:0.86,x:200,y:170},{t:1.0,x:200,y:170}] },
      { id: 'd2', label: 'D2', color: '#EF4444',
        keyframes: [{t:0,x:305,y:110},{t:0.14,x:305,y:110},{t:0.28,x:310,y:125},{t:0.42,x:280,y:110},{t:0.57,x:280,y:110},{t:0.72,x:305,y:110},{t:0.86,x:305,y:110},{t:1.0,x:305,y:110}] },
      { id: 'd3', label: 'D3', color: '#EF4444',
        keyframes: [{t:0,x:85,y:110},{t:0.14,x:85,y:110},{t:0.28,x:85,y:110},{t:0.42,x:85,y:110},{t:0.57,x:85,y:110},{t:0.72,x:85,y:110},{t:0.86,x:85,y:110},{t:1.0,x:85,y:110}] },
      { id: 'd4', label: 'D4', color: '#EF4444',
        keyframes: [{t:0,x:335,y:75},{t:0.14,x:335,y:75},{t:0.28,x:335,y:75},{t:0.42,x:320,y:55},{t:0.57,x:335,y:75},{t:0.72,x:335,y:75},{t:0.86,x:335,y:75},{t:1.0,x:335,y:75}] },
      { id: 'd5', label: 'D5', color: '#EF4444',
        keyframes: [{t:0,x:55,y:75},{t:0.14,x:55,y:75},{t:0.28,x:55,y:75},{t:0.42,x:55,y:75},{t:0.57,x:55,y:75},{t:0.72,x:55,y:75},{t:0.86,x:55,y:75},{t:1.0,x:55,y:75}] },
    ],
    ball: [{t:0,x:200,y:184},{t:0.14,x:200,y:184},{t:0.28,x:310,y:124},{t:0.42,x:280,y:104},{t:0.57,x:340,y:26},{t:0.72,x:200,y:184},{t:0.86,x:200,y:184},{t:1.0,x:200,y:184}],
    arrows: [
      { fromT: 0.14, fromX: 200, fromY: 200, toT: 0.14, toX: 200, toY: 170, color: '#FFE135', label: 'Pressure', dashed: false },
      { fromT: 0.14, fromX: 310, fromY: 140, toT: 0.14, toX: 305, toY: 110, color: '#FFE135', label: 'Deny ✋', dashed: true },
      { fromT: 0.28, fromX: 200, fromY: 200, toT: 0.28, toX: 310, toY: 140, color: '#2ECC71', label: 'Pass', dashed: false },
      { fromT: 0.33, fromX: 310, fromY: 140, toT: 0.33, toX: 310, toY: 125, color: '#00D4FF', label: 'Closeout', dashed: false },
      { fromT: 0.42, fromX: 340, fromY: 42, toT: 0.42, toX: 320, toY: 55, color: '#FFE135', label: 'Help 🛡️', dashed: true },
      { fromT: 0.57, fromX: 280, fromY: 120, toT: 0.57, toX: 340, toY: 42, color: '#2ECC71', label: 'Kick out', dashed: false },
      { fromT: 0.72, fromX: 340, fromY: 42, toT: 0.72, toX: 200, toY: 200, color: '#2ECC71', label: 'Skip pass', dashed: false },
    ],
  },
};

export default manToManScenarios;
