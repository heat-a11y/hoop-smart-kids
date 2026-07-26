import { useLanguage } from '../../context/LanguageContext';
import FiveOutScene from './FiveOutScene';
import ModuleShell from './ModuleShell';
import allFiveOutScenarios from '../../data/fiveOutScenarios';

const makeStage = (key, icon, en, zh) => ({
  id: key,
  component: (props) => <FiveOutScene {...props} scenario={allFiveOutScenarios[key]} />,
  icon,
  en,
  zh,
  subtitleEn: allFiveOutScenarios[key].en.subtitle,
  subtitleZh: allFiveOutScenarios[key].zh.subtitle,
  color: 'from-court-orange to-basketball-red',
  half: 'top',
});

const DRILLS = [
  makeStage('stage1', '📏', 'Basic Cutting (5-on-0)', '基本切入（5对0）'),
  makeStage('stage2', '🧱', 'Screening Away', '远离掩护'),
  makeStage('stage3', '🏃', 'On-Ball Screen (Pick & Roll)', '持球掩护（挡拆）'),
  makeStage('stage4', '✂️', 'Dribble At & Back Cut', '运球逼近与反跑'),
  makeStage('stage5', '🎯', 'Full 5-Out Possession', '5外完整回合'),
];

export default function FiveOutModule({ onBack }) {
  const { lang } = useLanguage();

  return (
    <ModuleShell
      drills={DRILLS}
      moduleKey="fiveout"
      icon="🏀"
      onBack={onBack}
      summary={{
        icon: '🏀',
        title: lang === 'en' ? '5-Out Offense Complete!' : '5外进攻通关！',
        titleEn: '5-Out Offense',
        titleZh: '5外进攻',
        desc: lang === 'en'
          ? 'You learned all 5 stages of 5-out offense — spacing, reading defense, on-ball screens, off-ball cuts, and full possession flow. +500 IQ Points earned!'
          : '你学习了5外进攻的全部5个阶段 — 空间、阅读防守、持球掩护、无球切入和完整回合流程。获得+500篮球智商！',
        cta: lang === 'en' ? 'Back to Dashboard' : '返回主菜单',
        progressLabel: (i, t) => lang === 'en' ? `Stage ${i + 1} of ${t}` : `阶段 ${i + 1}/${t}`,
      }}
    />
  );
}
