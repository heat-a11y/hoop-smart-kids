import { useLanguage } from '../../context/LanguageContext';
import FiveOutScene from './FiveOutScene';
import ModuleShell from './ModuleShell';
import allTransitionScenarios from '../../data/transitionScenarios';

const DRILLS = [
  {
    id: 'fullTransition',
    component: (props) => <FiveOutScene {...props} scenario={allTransitionScenarios.fullTransition} />,
    icon: '🔄',
    en: 'Full Transition Cycle',
    zh: '完整转换循环',
    subtitleEn: allTransitionScenarios.fullTransition.en.subtitle,
    subtitleZh: allTransitionScenarios.fullTransition.zh.subtitle,
    color: 'from-court-orange to-basketball-red',
  },
];

export default function TransitionModule({ onBack }) {
  const { lang } = useLanguage();

  return (
    <ModuleShell
      drills={DRILLS}
      moduleKey="transition"
      icon="🔄"
      onBack={onBack}
      summary={{
        icon: '🏀',
        title: lang === 'en' ? 'Full Transition Cycle Complete!' : '完整转换循环通关！',
        titleEn: 'Full Transition',
        titleZh: '完整转换',
        desc: lang === 'en'
          ? 'You learned the complete possession cycle — rebound → outlet → 5-out offense → score → throw-in → full-court defense → half-court defense. +200 IQ Points earned!'
          : '你学习了完整回合循环 — 篮板→传球→5外进攻→得分→发球→全场防守→半场防守。获得+200篮球智商！',
        cta: lang === 'en' ? 'Back to Dashboard' : '返回主菜单',
        progressLabel: (i, t) => lang === 'en' ? `Drill ${i + 1} of ${t}` : `训练 ${i + 1}/${t}`,
      }}
    />
  );
}
