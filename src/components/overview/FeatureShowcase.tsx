import { useState } from 'react';
import { cn } from '@/src/lib/utils';
import { ComparisonCard } from './ComparisonCard';
import { GifPlayer } from './GifPlayer';
import { VideoPlayer } from './VideoPlayer';

interface TabContent {
  id: string;
  label: string;
  traditional: {
    title: string;
    description: string;
    tags: string[];
  };
  ai: {
    title: string;
    description: string;
    tags: string[];
  };
  videoTitle: string;
  gifUrl?: string;
  videoUrl?: string;
  type: 'gif' | 'video';
}

const tabContents: TabContent[] = [
  {
    id: 'shotlist',
    label: '分镜脚本',
    traditional: {
      title: '传统分镜制作',
      description: '需要手动分析剧本、拆分镜头、标注角色对白，耗时费力且容易遗漏细节。',
      tags: ['手动分镜', '人工标注', '效率低下'],
    },
    ai: {
      title: 'AI 智能分镜',
      description: '输入文本后,AI自动完成分镜分析、角色识别、段落拆分，一键生成专业分镜脚本。',
      tags: ['智能分镜', '自动分角色', 'AI分段'],
    },
    videoTitle: '智能分镜演示',
    gifUrl: 'https://voice-agent.wawoai.com/public/overview/1.gif',
    // gifUrl:'https://voice-agent.s3.bitiful.net/overview/1.gif',
    type: 'gif',
  },
  {
    id: 'voice',
    label: '智能配音',
    traditional: {
      title: '传统配音制作',
      description:
        '需要联系专业录音师，预约录音棚，录制周期通常需要数天到数周。后期修改需要重新录制，成本高昂。',
      tags: ['录音师预约', '录音棚成本', '修改周期长'],
    },
    ai: {
      title: 'AI 智能配音',
      description:
        '输入文本即可秒级生成高质量配音，支持多种音色选择，随时修改无额外成本，一键批量处理。',
      tags: ['秒级生成', '多音色可选', '零修改成本'],
    },
    videoTitle: '配音工作流演示',
    videoUrl: 'https://voice-agent.wawoai.com/public/overview/2.mp4',
    type: 'video',
  },
  {
    id: 'sfx',
    label: '音效描述匹配',
    traditional: {
      title: '传统音效查找',
      description: '需要在海量音效库中手动搜索，逐个试听筛选，难以找到完美匹配的音效，耗时费力。',
      tags: ['手动搜索', '逐个试听', '匹配度低'],
    },
    ai: {
      title: 'AI 智能音效',
      description: 'AI 自动分析场景内容，智能推荐最匹配的音效，支持一键替换和微调，大幅提升效率。',
      tags: ['智能推荐', '场景分析', '一键替换', '手动增加和删除'],
    },
    videoTitle: '音效自动匹配演示',
    gifUrl: 'https://voice-agent.wawoai.com/public/overview/3.gif',
    type: 'gif',
  },
  {
    id: 'bgm',
    label: 'BGM 生成',
    traditional: {
      title: '传统背景音乐',
      description: '购买版权音乐成本高，免费音乐质量参差不齐，且难以找到与内容氛围完美契合的配乐。',
      tags: ['版权成本', '质量不稳定', '匹配困难'],
    },
    ai: {
      title: 'AI 生成配乐',
      description: '根据内容情感和节奏智能生成原创配乐，无版权困扰，支持风格调整和长度定制。',
      tags: ['原创无版权', '情感匹配', '自由定制'],
    },
    videoTitle: 'BGM 生成演示',
    videoUrl: 'https://voice-agent.s3.bitiful.net/overview/4-1.mp4',
    type: 'video',
  },
  {
    id: 'batch',
    label: '音效搜索',
    traditional: {
      title: '传统逐条处理',
      description:
        '每个视频/音频都需要单独处理，重复性工作多，效率低下，难以应对大量内容生产需求。',
      tags: ['逐条处理', '效率低', '重复劳动'],
    },
    ai: {
      title: 'AI 批量处理',
      description: '支持批量导入内容，AI 自动并行处理，一键导出所有成品，轻松应对规模化生产。',
      tags: ['批量导入', '并行处理', '一键导出'],
    },
    videoTitle: '批量导出演示',
    videoUrl: 'https://voice-agent.s3.bitiful.net/overview/5.mp4',
    type: 'video',
  },
];

export function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState(tabContents[0].id);
  const activeContent = tabContents.find((tab) => tab.id === activeTab)!;

  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="mb-10 text-center md:mb-12">
          <h2 className="text-2xl font-bold text-black sm:text-3xl md:text-4xl">
            AI 创作，颠覆传统
          </h2>
          <p className="mt-3 text-sm text-neutral-600 sm:mt-4 sm:text-base">
            对比传统方式，感受 AI Agent 带来的效率革命
          </p>
        </div>

        {/* Tabs - Scrollable on mobile */}
        <div className="mb-6 flex justify-center md:mb-8">
          <div className="inline-flex gap-1 overflow-x-auto rounded-lg bg-neutral-100 p-1">
            {tabContents.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 sm:px-4',
                  activeTab === tab.id
                    ? 'bg-white text-black shadow-sm'
                    : 'text-neutral-500 hover:text-black'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Left: Comparison Cards */}
          <div className="flex flex-col gap-4">
            <div
              key={`${activeTab}-traditional`}
              className="animate-in fade-in slide-in-from-left-4 duration-300"
            >
              <ComparisonCard
                variant="traditional"
                title={activeContent.traditional.title}
                description={activeContent.traditional.description}
                tags={activeContent.traditional.tags}
              />
            </div>
            <div
              key={`${activeTab}-ai`}
              className="animate-in fade-in slide-in-from-left-4 duration-300"
              style={{ animationDelay: '100ms' }}
            >
              <ComparisonCard
                variant="ai"
                title={activeContent.ai.title}
                description={activeContent.ai.description}
                tags={activeContent.ai.tags}
              />
            </div>
          </div>

          {/* Right: GIF/Video Demo */}
          <div
            key={`${activeTab}-media`}
            className="animate-in fade-in slide-in-from-right-4 flex items-stretch duration-300"
          >
            {activeContent.type === 'gif' && activeContent.gifUrl ? (
              <GifPlayer
                gifUrl={activeContent.gifUrl}
                title={activeContent.videoTitle}
                className="w-full"
              />
            ) : activeContent.type === 'video' && activeContent.videoUrl ? (
              <VideoPlayer
                videoUrl={activeContent.videoUrl}
                title={activeContent.videoTitle}
                className="w-full"
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
