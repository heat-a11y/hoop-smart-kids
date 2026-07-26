import SeeBallSeeManGame from './SeeBallSeeManGame';
import HelpRecoverGame from './HelpRecoverGame';
import BoxOutGame from './BoxOutGame';
import ModuleShell from './ModuleShell';
import { useLanguage } from '../../context/LanguageContext';

const DRILLS = [
  { id: 'see-ball', component: SeeBallSeeManGame, icon: '👁️', en: 'See Ball, See Man', zh: '看球看人', subtitleEn: 'Pistol Position Defense', subtitleZh: '手枪防守位置', color: 'from-neon-blue to-blue-600' },
  { id: 'help-recover', component: HelpRecoverGame, icon: '🛡️', en: 'Help and Recover!', zh: '协防与回位！', subtitleEn: 'Team Defense Rotation', subtitleZh: '团队防守轮转', color: 'from-court-orange to-basketball-red' },
  { id: 'box-out', component: BoxOutGame, icon: '💪', en: 'Box Out Timing', zh: '卡位时机', subtitleEn: 'Secure the Rebound', subtitleZh: '抢下篮板', color: 'from-neon-yellow to-yellow-500' },
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
          ? 'You mastered positioning, help defense, and boxing out! +300 IQ Points earned.'
          : '你掌握了防守位置、协防和卡位！获得+300篮球智商。',
        cta: lang === 'en' ? 'Back to Dashboard' : '返回主菜单',
        titleEn: 'Lockdown Defense',
        titleZh: '铁壁防守',
        progressLabel: (i, t) => lang === 'en' ? `Drill ${i + 1} of ${t}` : `训练 ${i + 1}/${t}`,
      }}
    />
  );
}
