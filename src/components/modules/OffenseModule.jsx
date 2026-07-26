import TripleThreatGame from './TripleThreatGame';
import FastbreakGame from './FastbreakGame';
import SpacingGame from './SpacingGame';
import ModuleShell from './ModuleShell';
import { useLanguage } from '../../context/LanguageContext';

const DRILLS = [
  { id: 'triple-threat', component: TripleThreatGame, icon: '🏀', en: 'Pass, Shoot, or Drive?', zh: '传球、投篮还是突破？', subtitleEn: 'Triple Threat Decision', subtitleZh: '三重威胁决策', color: 'from-court-orange to-basketball-red' },
  { id: 'fastbreak', component: FastbreakGame, icon: '⚡', en: '2-on-1 Fastbreak', zh: '2对1快攻', subtitleEn: 'Make the Right Read', subtitleZh: '做出正确判断', color: 'from-neon-blue to-blue-600' },
  { id: 'spacing', component: SpacingGame, icon: '📐', en: 'Space the Floor', zh: '拉开空间', subtitleEn: 'Find the Open Spot', subtitleZh: '找到空位', color: 'from-neon-yellow to-yellow-500' },
];

export default function OffenseModule({ onBack }) {
  const { lang } = useLanguage();
  return (
    <ModuleShell
      drills={DRILLS}
      moduleKey="offense"
      icon="🏀"
      onBack={onBack}
      summary={{
        icon: '🏆',
        title: lang === 'en' ? 'Offense Master Complete!' : '进攻大师通关！',
        desc: lang === 'en'
          ? 'You made smart decisions and earned +300 IQ Points. Coach Bear is proud!'
          : '你做出了聪明的决策并获得了+300篮球智商。熊教练为你骄傲！',
        cta: lang === 'en' ? 'Back to Dashboard' : '返回主菜单',
        titleEn: 'Offense Mastery',
        titleZh: '进攻决策',
        progressLabel: (i, t) => lang === 'en' ? `Scenario ${i + 1} of ${t}` : `场景 ${i + 1}/${t}`,
      }}
    />
  );
}
