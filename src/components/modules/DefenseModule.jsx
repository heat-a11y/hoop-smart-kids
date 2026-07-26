import SeeBallSeeManGame from './SeeBallSeeManGame';
import HelpRecoverGame from './HelpRecoverGame';
import BoxOutGame from './BoxOutGame';
import MultipleChoiceGame from './MultipleChoiceGame';
import ModuleShell from './ModuleShell';
import { useLanguage } from '../../context/LanguageContext';
import allDefenseScenarios from '../../data/defenseScenarios';

const makeScenario = (key, icon, en, zh) => ({
  id: key,
  component: (props) => <MultipleChoiceGame {...props} scenario={allDefenseScenarios[key]} moduleKey="defense" />,
  icon, en, zh,
  subtitleEn: allDefenseScenarios[key].en.subtitle,
  subtitleZh: allDefenseScenarios[key].zh.subtitle,
  color: 'from-court-orange to-basketball-red',
});

const DRILLS = [
  { id: 'see-ball', component: SeeBallSeeManGame, icon: '👁️', en: 'See Ball, See Man', zh: '看球看人', subtitleEn: 'Pistol Position Defense', subtitleZh: '手枪防守位置', color: 'from-neon-blue to-blue-600' },
  { id: 'help-recover', component: HelpRecoverGame, icon: '🛡️', en: 'Help and Recover!', zh: '协防与回位！', subtitleEn: 'Team Defense Rotation', subtitleZh: '团队防守轮转', color: 'from-court-orange to-basketball-red' },
  { id: 'box-out', component: BoxOutGame, icon: '💪', en: 'Box Out Timing', zh: '卡位时机', subtitleEn: 'Secure the Rebound', subtitleZh: '抢下篮板', color: 'from-neon-yellow to-yellow-500' },
  makeScenario('closeout', '🏃', 'Closeout with Control', '控制性扑防'),
  makeScenario('defendScreen', '🧱', 'Defend the Pick & Roll', '防守挡拆'),
  makeScenario('denyPass', '✋', 'Deny the Passing Lane', '拦截传球路线'),
  makeScenario('helpRotate', '🔄', 'Help Side Rotation', '弱侧协防轮转'),
  makeScenario('contest', '📏', 'Contest Without Fouling', '不犯规的干扰'),
];

export default function DefenseModule({ onBack }) {
  const { lang } = useLanguage();
  return (
    <ModuleShell
      drills={DRILLS}
      moduleKey="defense"
      icon="🛡️"
      onBack={onBack}
      summary={{
        icon: '🛡️',
        title: lang === 'en' ? 'Lockdown Defense Complete!' : '铁壁防守通关！',
        desc: lang === 'en'
          ? `You mastered ${DRILLS.length} defensive fundamentals! +300 IQ Points earned.`
          : `你掌握了${DRILLS.length}项防守基本功！获得+300篮球智商。`,
        cta: lang === 'en' ? 'Back to Dashboard' : '返回主菜单',
        titleEn: 'Lockdown Defense',
        titleZh: '铁壁防守',
        progressLabel: (i, t) => lang === 'en' ? `Drill ${i + 1} of ${t}` : `训练 ${i + 1}/${t}`,
      }}
    />
  );
}
