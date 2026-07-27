/**
 * Full Transition — Rebound → Offense → Score → Throw-in → Defense
 * Shows a complete possession cycle:
 *   1. Defensive rebound
 *   2. Outlet pass → push the ball
 *   3. 5-out offense (basic cut motion)
 *   4. Score
 *   5. Opponent throw-in
 *   6. Full-court man defense
 *   7. Half-court man defense settled
 *
 * Full-court view: half='top' (no shift), coords 0-640
 * Top basket y=32, Half court y=320, Bottom basket y=612
 */

const transitionScenarios = {
  fullTransition: {
    id: 'fullTransition',
    half: 'top',
    showDefenders: true,
    en: {
      title: 'Full Transition — Rebound to Defense',
      subtitle: 'Complete Possession Cycle',
      setup: 'A complete basketball possession from start to finish. Watch how the team transitions from defense to offense (rebound → outlet → push → 5-out offense → score), then immediately back to defense (throw-in → full-court pick up → half-court shell). This is the full cycle every team runs on every possession.',
      timeline: [
        { at: 0, text: '⛹️ Defensive rebound secured! Defender grabs the board. Time to transition to offense.' },
        { at: 0.1, text: '🎯 Outlet pass to the PG. PG sprints up the court — push the ball!' },
        { at: 0.2, text: '🏃 PG brings ball up. Teammates fill their 5-out spots on the 3-pt line.' },
        { at: 0.3, text: '🎯 Pass to wing. Basic cut action — passer cuts through, others fill.' },
        { at: 0.42, text: '🏀 Ball swings to the corner. Player attacks the closeout and drives.' },
        { at: 0.55, text: '🏆 Score! Easy basket from 5-out motion offense.' },
        { at: 0.65, text: '🔄 Opponent throw-in. Other team inbounding. Defense must get set NOW.' },
        { at: 0.75, text: '🏃 Full-court man defense! D1 picks up PG. D2–D5 deny/sag in full-court shell.' },
        { at: 0.85, text: '⛹️ Offense advances past half court. Defense retreats into half-court shell.' },
        { at: 1.0, text: '✅ Half-court man defense set! Ball at top. All 5 defenders in position. Cycle complete.' },
      ],
    },
    zh: {
      title: '完整转换 — 从篮板到防守',
      subtitle: '完整回合循环',
      setup: '一个完整的篮球回合从头到尾。观察球队如何从防守转换到进攻（篮板→传球→推进→5外进攻→得分），然后立即回到防守（发球→全场紧逼→半场防守壳）。这是每支球队每个回合都要跑的完整循环。',
      timeline: [
        { at: 0, text: '⛹️ 防守篮板拿到！防守者抢下篮板。准备转换进攻。' },
        { at: 0.1, text: '🎯 快速传球给控卫。控卫冲刺推进——快攻！' },
        { at: 0.2, text: '🏃 控卫运球推进。队友在三分线上占5外位置。' },
        { at: 0.3, text: '🎯 传球给侧翼。基本切入动作——传球者切入，其他人补位。' },
        { at: 0.42, text: '🏀 球转到底角。球员扑防后突破。' },
        { at: 0.55, text: '🏆 得分！5外进攻轻松得分。' },
        { at: 0.65, text: '🔄 对方发球。进攻方必须在此时立即设置防守。' },
        { at: 0.75, text: '🏃 全场人盯人！D1压迫控卫。D2–D5在全场防守壳中阻绝/回收。' },
        { at: 0.85, text: '⛹️ 进攻方过半场。防守方退入半场防守壳。' },
        { at: 1.0, text: '✅ 半场人盯人防守就位！球在弧顶。全部5名防守者到位。循环完成。' },
      ],
    },
    players: [
      // O1 = PG (ball handler, runs the offense)
      { id: 'o1', label: 'PG', color: '#3B82F6',
        keyframes: [
          {t:0,x:290,y:580},{t:0.1,x:290,y:580},
          {t:0.2,x:200,y:400},{t:0.3,x:200,y:200},
          {t:0.42,x:310,y:140},{t:0.55,x:310,y:130},
          {t:0.65,x:310,y:130},{t:0.75,x:310,y:130},
          {t:0.85,x:200,y:200},{t:1.0,x:200,y:200},
        ] },
      // O2 = SG (right wing)
      { id: 'o2', label: 'SG', color: '#3B82F6',
        keyframes: [
          {t:0,x:100,y:560},{t:0.1,x:100,y:560},
          {t:0.2,x:80,y:420},{t:0.3,x:310,y:140},
          {t:0.42,x:280,y:130},{t:0.55,x:280,y:130},
          {t:0.65,x:280,y:130},{t:0.75,x:280,y:130},
          {t:0.85,x:310,y:140},{t:1.0,x:310,y:140},
        ] },
      // O3 = SF (left wing)
      { id: 'o3', label: 'SF', color: '#3B82F6',
        keyframes: [
          {t:0,x:340,y:560},{t:0.1,x:340,y:560},
          {t:0.2,x:320,y:420},{t:0.3,x:90,y:140},
          {t:0.42,x:90,y:140},{t:0.55,x:90,y:140},
          {t:0.65,x:90,y:140},{t:0.75,x:90,y:140},
          {t:0.85,x:90,y:140},{t:1.0,x:90,y:140},
        ] },
      // O4 = PF (big, runs to right corner)
      { id: 'o4', label: 'PF', color: '#3B82F6',
        keyframes: [
          {t:0,x:200,y:580},{t:0.1,x:200,y:580},
          {t:0.2,x:200,y:460},{t:0.3,x:340,y:42},
          {t:0.42,x:340,y:42},{t:0.55,x:340,y:42},
          {t:0.65,x:340,y:42},{t:0.75,x:340,y:42},
          {t:0.85,x:340,y:42},{t:1.0,x:340,y:42},
        ] },
      // O5 = C (big, runs to left corner)
      { id: 'o5', label: 'C', color: '#3B82F6',
        keyframes: [
          {t:0,x:150,y:560},{t:0.1,x:150,y:560},
          {t:0.2,x:200,y:460},{t:0.3,x:60,y:42},
          {t:0.42,x:60,y:42},{t:0.55,x:60,y:42},
          {t:0.65,x:60,y:42},{t:0.75,x:60,y:42},
          {t:0.85,x:60,y:42},{t:1.0,x:60,y:42},
        ] },
    ],
    defenders: [
      // D1 = PG defender
      { id: 'd1', label: 'D1', color: '#EF4444',
        keyframes: [
          {t:0,x:200,y:340},{t:0.1,x:200,y:340},
          {t:0.2,x:200,y:340},{t:0.3,x:200,y:170},
          {t:0.42,x:200,y:170},{t:0.55,x:200,y:170},
          {t:0.65,x:200,y:340},{t:0.75,x:200,y:335},
          {t:0.85,x:200,y:170},{t:1.0,x:200,y:170},
        ] },
      // D2 = SG defender
      { id: 'd2', label: 'D2', color: '#EF4444',
        keyframes: [
          {t:0,x:300,y:330},{t:0.1,x:300,y:330},
          {t:0.2,x:300,y:330},{t:0.3,x:305,y:110},
          {t:0.42,x:280,y:110},{t:0.55,x:280,y:110},
          {t:0.65,x:280,y:310},{t:0.75,x:290,y:310},
          {t:0.85,x:305,y:110},{t:1.0,x:305,y:110},
        ] },
      // D3 = SF defender
      { id: 'd3', label: 'D3', color: '#EF4444',
        keyframes: [
          {t:0,x:100,y:330},{t:0.1,x:100,y:330},
          {t:0.2,x:100,y:330},{t:0.3,x:85,y:110},
          {t:0.42,x:85,y:110},{t:0.55,x:85,y:110},
          {t:0.65,x:90,y:310},{t:0.75,x:90,y:310},
          {t:0.85,x:85,y:110},{t:1.0,x:85,y:110},
        ] },
      // D4 = PF defender (helps off corner)
      { id: 'd4', label: 'D4', color: '#EF4444',
        keyframes: [
          {t:0,x:320,y:270},{t:0.1,x:320,y:270},
          {t:0.2,x:320,y:270},{t:0.3,x:335,y:75},
          {t:0.42,x:320,y:55},{t:0.55,x:320,y:55},
          {t:0.65,x:330,y:250},{t:0.75,x:330,y:280},
          {t:0.85,x:335,y:75},{t:1.0,x:335,y:75},
        ] },
      // D5 = C defender (helps off corner)
      { id: 'd5', label: 'D5', color: '#EF4444',
        keyframes: [
          {t:0,x:80,y:270},{t:0.1,x:80,y:270},
          {t:0.2,x:80,y:270},{t:0.3,x:55,y:75},
          {t:0.42,x:55,y:75},{t:0.55,x:55,y:75},
          {t:0.65,x:70,y:250},{t:0.75,x:70,y:280},
          {t:0.85,x:55,y:75},{t:1.0,x:55,y:75},
        ] },
    ],
    ball: [
      {t:0,x:200,y:340},{t:0.1,x:290,y:564},
      {t:0.2,x:200,y:384},{t:0.3,x:200,y:184},
      {t:0.42,x:280,y:114},{t:0.55,x:200,y:16},
      {t:0.65,x:200,y:16},{t:0.7,x:340,y:580},
      {t:0.75,x:280,y:410},{t:0.85,x:200,y:184},
      {t:1.0,x:200,y:184},
    ],
    arrows: [
      { fromT: 0.08, fromX: 200, fromY: 340, toT: 0.1, toX: 290, toY: 580, color: '#2ECC71', label: 'Outlet', dashed: false },
      { fromT: 0.18, fromX: 200, fromY: 400, toT: 0.18, toX: 80, toY: 420, color: '#00D4FF', label: 'Fill spots', dashed: true },
      { fromT: 0.18, fromX: 200, fromY: 400, toT: 0.18, toX: 320, toY: 420, color: '#00D4FF', label: 'Fill spots', dashed: true },
      { fromT: 0.3, fromX: 200, fromY: 200, toT: 0.3, toX: 310, toY: 140, color: '#2ECC71', label: 'Pass', dashed: false },
      { fromT: 0.35, fromX: 200, fromY: 200, toT: 0.42, toX: 340, toY: 42, color: '#FFE135', label: 'Cut → swing', dashed: true },
      { fromT: 0.48, fromX: 340, fromY: 42, toT: 0.48, toX: 280, toY: 130, color: '#2ECC71', label: 'Feed', dashed: false },
      { fromT: 0.55, fromX: 280, fromY: 130, toT: 0.55, toX: 200, toY: 16, color: '#FFE135', label: '🏆 Score!', dashed: false },
      { fromT: 0.65, fromX: 200, fromY: 16, toT: 0.7, toX: 340, toY: 580, color: '#00D4FF', label: 'Throw-in', dashed: false },
      { fromT: 0.75, fromX: 340, fromY: 580, toT: 0.75, toX: 280, toY: 410, color: '#FFE135', label: 'Pick up!', dashed: false },
      { fromT: 0.85, fromX: 280, fromY: 410, toT: 0.85, toX: 200, toY: 200, color: '#FFE135', label: 'Retreat', dashed: true },
    ],
  },
};

export default transitionScenarios;
