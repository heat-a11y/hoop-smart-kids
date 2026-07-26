import CallScreenGame from './CallScreenGame';
import CalloutSoundboardGame from './CalloutSoundboardGame';
import EncouragementGame from './EncouragementGame';
import MultipleChoiceGame from './MultipleChoiceGame';
import ModuleShell from './ModuleShell';
import { useLanguage } from '../../context/LanguageContext';
import allCommScenarios from '../../data/communicationScenarios';

const makeScenario = (key, icon, en, zh) => ({
  id: key,
  component: (props) => <MultipleChoiceGame {...props} scenario={allCommScenarios[key]} moduleKey="communication" />,
  icon, en, zh,
  subtitleEn: allCommScenarios[key].en.subtitle,
  subtitleZh: allCommScenarios[key].zh.subtitle,
  color: 'from-court-orange to-basketball-red',
});

const DRILLS = [
  { id: 'call-screen', component: CallScreenGame, icon: '📢', en: 'Call the Screen!', zh: '呼叫掩护！', subtitleEn: 'Vocal Communication', subtitleZh: '声音沟通', color: 'from-neon-yellow to-yellow-500' },
  { id: 'soundboard', component: CalloutSoundboardGame, icon: '🔊', en: 'Callout Soundboard', zh: '口令发声板', subtitleEn: 'Tap the Right Call', subtitleZh: '正确口令', color: 'from-neon-blue to-blue-600' },
  { id: 'encourage', component: EncouragementGame, icon: '💪', en: 'Teammate Encouragement', zh: '鼓励队友', subtitleEn: 'Build Your Team Up!', subtitleZh: '建设团队！', color: 'from-success-green to-emerald-600' },
  makeScenario('callSwitch', '🔄', 'Call the Switch', '呼叫换防'),
  makeScenario('transitionComm', '⚡', 'Transition Defense', '转换防守'),
  makeScenario('offBallScreen', '👀', 'Off-Ball Screen', '无球掩护沟通'),
  makeScenario('doubleTeam', '🪤', 'Call the Trap', '呼叫包夹'),
];

export default function CommunicationModule({ onBack }) {
  const { lang } = useLanguage();
  return (
    <ModuleShell
      drills={DRILLS}
      moduleKey="communication"
      icon="🗣️"
      onBack={onBack}
      summary={{
        icon: '🗣️',
        title: lang === 'en' ? 'Court Communication Complete!' : '场上沟通通关！',
        desc: lang === 'en'
          ? `You learned ${DRILLS.length} communication skills across the court! +300 IQ Points earned.`
          : `你学会了${DRILLS.length}项场上沟通技巧！获得+300篮球智商。`,
        cta: lang === 'en' ? 'Back to Dashboard' : '返回主菜单',
        titleEn: 'Court Communication',
        titleZh: '场上沟通',
        progressLabel: (i, t) => lang === 'en' ? `Drill ${i + 1} of ${t}` : `训练 ${i + 1}/${t}`,
      }}
    />
  );
}
