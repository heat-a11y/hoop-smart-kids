import { useLanguage } from '../../context/LanguageContext';
import FiveOutScene from './FiveOutScene';
import ModuleShell from './ModuleShell';
import allManToManScenarios from '../../data/manToManScenarios';

const makeStage = (key, icon, en, zh) => ({
  id: key,
  component: (props) => <FiveOutScene {...props} scenario={allManToManScenarios[key]} />,
  icon,
  en,
  zh,
  subtitleEn: allManToManScenarios[key].en.subtitle,
  subtitleZh: allManToManScenarios[key].zh.subtitle,
  color: 'from-neon-blue to-blue-600',
});

const DRILLS = [
  makeStage('fullCourt', '🏃', 'Full-Court Man Defense', '全场人盯人防守'),
  makeStage('halfCourt', '🛡️', 'Half-Court Man Defense (Shell)', '半场人盯人防守（壳）'),
];

export default function ManToManModule({ onBack }) {
  const { lang } = useLanguage();

  return (
    <ModuleShell
      drills={DRILLS}
      moduleKey="mantoman"
      icon="🛡️"
      onBack={onBack}
      summary={{
        icon: '🛡️',
        title: lang === 'en' ? 'Man-to-Man Defense Complete!' : '人盯人防守通关！',
        titleEn: 'Man-to-Man Defense',
        titleZh: '人盯人防守',
        desc: lang === 'en'
          ? 'You learned full-court and half-court man-to-man defense principles — pressure, deny, help, and recover. +300 IQ Points earned!'
          : '你学习了全场和半场人盯人防守原则 — 压迫、阻绝、协防和回位。获得+300篮球智商！',
        cta: lang === 'en' ? 'Back to Dashboard' : '返回主菜单',
        progressLabel: (i, t) => lang === 'en' ? `Scenario ${i + 1} of ${t}` : `场景 ${i + 1}/${t}`,
      }}
    />
  );
}
