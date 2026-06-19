import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowRight,
  Briefcase,
  Brain,
  CaretLeft,
  CaretRight,
  GithubLogo,
  GlobeHemisphereWest,
  LinkSimple,
  Sparkle,
  X,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import "./index.css";

const links = {
  github: "https://github.com/51522yhj",
  note: "https://www.yuque.com/yuqueyonghutosy8c/ildvwi/gibkpnaswxuu41uf",
  admin: "https://www.fuzhuanghoutencentonline.icu/admin/",
  resume: "/assets/resume/yuhaojun-resume.pdf",
};

const navItems = [
  ["经历", "#work"],
  ["企业项目", "#enterprise"],
  ["个人项目", "#projects"],
  ["VibeCoding", "#vibecoding"],
  ["技能", "#skills"],
];

const workExperience = [
  {
    time: "2025.07 至今",
    company: "南京正大天晴",
    role: "后端工程师",
    text: "参与智审 aimod、放心签 signAtEase 等企业系统建设，围绕企业级 AI 审核、合同全生命周期、外部系统集成和生产问题排查做后端交付。",
    details: [
      "在智审项目中参与任务创建、外部系统数据采集、Handler 编排、AI/DS 审核请求组装和规则结果落库。",
      "在放心签项目中参与合同拟定、提交审批、签署归档、专家协议智能创建、文件生成和定时任务补偿等链路。",
      "日常结合数据库表、应用数据快照、接口日志和外部系统返回定位联调与生产问题，沉淀常用排查 SQL 和测试方法。",
    ],
    tags: ["Spring Boot", "Dubbo", "MySQL", "AI 审核", "合同系统"],
  },
  {
    time: "2024.09 - 2025.02",
    company: "沈阳麟龙科技股份有限公司",
    role: "Java 研发实习生",
    text: "接触股票相关软件开发，参与内部业务接口、Redis、ES、RabbitMQ、XXL-JOB、gRPC 调用和员工账号开户相关开发。",
    details: [
      "围绕股票相关业务系统做后端接口开发与联调，熟悉内部服务之间的调用方式和数据流转。",
      "参与 Redis、ES、RabbitMQ、XXL-JOB、gRPC 等组件在业务链路中的使用和问题排查。",
      "参与员工账号开户相关功能开发，处理参数校验、接口调用、状态流转和异常返回。",
    ],
    tags: ["RabbitMQ", "Redis", "XXL-JOB", "gRPC", "股票软件"],
  },
  {
    time: "2024.07 - 2024.09",
    company: "武汉杰思敏科技有限公司",
    role: "后端开发实习生",
    text: "参与对接国企的项目开发，主要负责接口开发、数据处理、业务联调与交付配合。",
    details: [
      "按国企项目需求完成后端接口开发，配合前端与现场联调，保证字段、状态和业务口径一致。",
      "参与业务数据处理和接口返回结构整理，对接不同系统时关注参数映射、异常兜底和交付文档。",
      "在项目周期内配合测试反馈修复问题，熟悉从需求理解、接口实现到联调交付的完整节奏。",
    ],
    tags: ["接口开发", "数据处理", "国企项目", "业务联调"],
  },
];

const enterpriseProjects = [
  {
    id: "aimod",
    title: "智审 aimod",
    label: "企业：南京正大天晴",
    icon: Brain,
    stack: ["Spring Boot", "Dubbo", "Kafka", "MyBatis-Plus", "XXL-JOB", "MySQL"],
    summary:
      "企业级 AI 智能审核系统，面向报销、采购、合同、发票、设备验收等业务场景。系统通过多模块后端服务自动采集 HBX、SRM、SAP、EAM、电子影像、合同签章、发票识别、风控等数据，并把结构化业务数据、附件 OCR、规则和提示词整合后提交 AI/DS 引擎，生成规则级审核结果。",
    keyFacts: ["多模块 Maven 工程", "规则级审核结果", "多系统数据采集", "支持重跑与回调"],
    points: [
      "参与任务创建、场景规则匹配、Handler 编排、AI 审核结果落库等核心链路。",
      "维护 AimodContext 上下文流转，处理发票、合同、收货单、SAP/EAM 参数等跨 Handler 数据传递。",
      "参与 AI/DS 审核请求组装，将结构化数据、规则、提示词和 OCR 结果提交审核引擎。",
      "通过任务表、规则结果表、应用数据快照表定位数据来源与 AI 判断依据。",
    ],
    flow: ["创建审核任务", "匹配场景规则", "采集外部数据", "Handler 编排", "组装 AI/DS 请求", "规则结果落库", "人工复核/重跑/回调"],
    detailSections: [
      {
        title: "业务定位",
        items: [
          "把费用、采购、合同、发票、验收等人工审核动作抽象为任务、规则、数据快照和 AI 判断结果。",
          "解决审核数据分散、规则复杂、人工跨系统核对成本高、结果难沉淀的问题。",
          "最终目标不是简单调用大模型，而是形成可追踪、可重跑、可人工复核的企业审核闭环。",
        ],
      },
      {
        title: "核心链路",
        items: [
          "外部系统或前端发起任务后，由任务服务创建或加载 aimod_task_info，并根据业务场景确定 appList 和规则列表。",
          "系统构建 AimodContext，再按 AppTypeEnum 的 sort 顺序执行 Handler，逐步采集报销、采购、合同、发票、验收、风控和附件数据。",
          "BaseHandler 将每个 Handler 的应用数据保存到 aimod_task_relation_app，OcrHandler 补充附件文本，DsHandler 统一组装 AI/DS 请求。",
          "AI/DS 返回后按规则粒度写入 aimod_task_result，更新任务状态，必要时回调来源系统或进入人工复核。",
        ],
      },
      {
        title: "Handler 与上下文",
        items: [
          "HbxHandler 获取报销单、发票、收款、合同号、SRM 订单/收货单和流程实例；SrmHandler 补充采购、收货、品类、金额和 SAP/EAM 下游查询参数。",
          "SapQmHandler、SapMmHandler、EamHandler、AcceptanceHandler 分别处理质检、收货凭证、EAM 验收和设备验收阶段。",
          "AimodContext 保存 taskInfo、scene、reqMap、fileList、contractCodeList、receiveNoList、sapMmReqList、processIdMap、dsParam 等运行时数据。",
          "Handler 之间通过 AimodContext 传递依赖，避免互相直接调用，同时保证数据采集顺序和跨系统参数复用。",
        ],
      },
      {
        title: "外部系统与数据",
        items: [
          "HBX 提供报销单、业务类型、金额、发票、收款明细和流程信息；SRM 提供采购订单、收货单、品类、金额、收货时间和项目编号。",
          "SAP-QM 提供质检放行结果，SAP-MM 提供收货凭证和金额，EAM 提供设备/资产验收状态和验收阶段。",
          "电子影像、YPP、合同签章、风控、用户中心和飞书分别补充附件、发票识别、合同文件、风险信息、组织人员和配置类数据。",
          "DS/FastGPT/RAG 承担 AI 审核、OCR 文本理解和知识检索能力。",
        ],
      },
      {
        title: "核心表与排查",
        items: [
          "aimod_task_info 是任务主表，记录单据号、场景、任务状态、AI 汇总结果和人工结果。",
          "aimod_task_result 是规则结果表，保存每条规则的 AI 结果、AI 批注、人工结果、规则内容、来源和等级。",
          "aimod_task_relation_app 是应用数据快照表，每个 Handler 采集的数据按 app_type 保存 JSON，用于复盘 AI 判断依据。",
          "排查 AI 判断与业务数据不一致时，先看任务状态和规则结果，再看应用快照、附件/OCR、提示词与外部系统返回，确认是数据源、规则、提示词还是模型判断问题。",
        ],
      },
      {
        title: "Controller 与接口能力",
        items: [
          "TaskController 覆盖任务创建、列表、详情、校验、重跑、合同列表、文件 URL、规则结果、同步结果和导出任务。",
          "TaskFlowController 支持流程化构建任务数据，包括规则、提示词、文件、应用数据、结果保存、汇总和加入任务队列。",
          "ManageController 面向运维管理，提供错误任务列表、重跑、DS 执行、紧急执行、运行配置和结果查询。",
          "FeishuTestController 用于飞书表格配置测试，支撑部分配置类数据读取。",
        ],
      },
      {
        title: "采购需求与设备验收",
        items: [
          "采购需求场景会综合报销单、发票、SRM 订单/收货、合同文件、SAP-QM、SAP-MM、EAM、电子影像和风控信息。",
          "典型规则包括发票号、金额税额、税率、合同甲乙方、发票购销方、收货数量、质保期限、SAP-QM 放行、设备验收和供应商风险。",
          "设备验收链路中，HbxHandler 提取 SRM 收货单号，SrmHandler 补充品类、收货时间、SAP 同步标识和 EAM/SAP 查询参数。",
          "EamHandler 读取 ZYSSK 并映射为 EAM 验收结果；AcceptanceHandler 通过收货单号换设备编号，再查询验收阶段和流程状态。",
        ],
      },
      {
        title: "AI/DS 与附件处理",
        items: [
          "DsHandler 从 AimodContext.reqMap 读取结构化业务数据，合并规则列表、提示词、附件和 OCR 结果，形成 AI/DS 请求。",
          "AI 返回以 rule_id、rule_name、ai_result、ai_remark、rule_content 等规则维度结构保存，便于复核和追溯。",
          "文件来源包括 FSSC 电子影像、合同系统文件、发票扫描件、验收单、质保验收单、工程报审单和用户上传文件。",
          "aimod_task_file_info 保存文件元数据，文件可进入 OCR，也可通过 fileId 和 source 查询预览或下载 URL。",
        ],
      },
      {
        title: "队列、重跑与配置化",
        items: [
          "任务创建后可进入队列，支持按权重或速率调度、DS 异步执行、失败任务重跑、紧急任务执行和长时间未返回任务处理。",
          "CommonTaskQueueServiceImpl、ExecuteTaskManageImpl、RunAimodTaskExecuteImpl 等类支撑任务队列和执行管理。",
          "场景、业务类型、appList、ruleList、字段映射、外部 URL、枚举转换、飞书表格地址和 AI 提示词尽量配置化。",
          "base_config_item 可维护 EAM 字段 ZYSSK 映射、飞书 sheet 地址、Handler 字段映射等，减少外部字段变化带来的代码改动。",
        ],
      },
    ],
  },
  {
    id: "sign",
    title: "放心签 signAtEase",
    label: "企业：南京正大天晴",
    icon: Briefcase,
    stack: ["Spring Boot", "MyBatis-Plus", "MySQL", "Dubbo", "XXL-JOB", "TextIn"],
    summary:
      "公司内部企业级合同全生命周期管理系统，覆盖合同拟定、模板配置、审批流转、电子签署、文件归档、合同检索、权限控制、用印管理、智能体创建合同及外部系统联动。系统通过流程中心、文件中心、用户/组织/供应商中心、计划系统、消息中心和 OCR/TextIn 等服务完成合同闭环。",
    keyFacts: ["合同全生命周期", "智能体创建专家协议", "流程中心联动", "文件/OCR/签署补偿"],
    points: [
      "参与合同拟定、提交、审批、签署、归档等核心链路开发与维护。",
      "参与专家协议智能创建能力，实现智能体入参与合同业务模型转换。",
      "参与流程中心、文件中心、用户/组织/供应商中心、合合文档解析和印章提取等系统联调。",
      "参与合同文件生成、离线文件识别、定时任务补偿，提高合同创建和归档稳定性。",
    ],
    flow: ["拟定合同", "模板/文件处理", "保存签署方", "提交审批", "电子/线下签署", "文件归档", "检索与权限控制"],
    detailSections: [
      {
        title: "业务定位",
        items: [
          "放心签是企业级合同全生命周期管理系统，目标是把线下合同流转变成线上结构化、流程化、可追踪、可审计的闭环。",
          "系统覆盖合同拟定、模板配置、审批、签署、归档、用印、可见范围、合同检索和外部系统联动。",
          "支持模板合同、非模板合同、主子合同、线下签、电子签以及智能体创建合同等复杂场景。",
        ],
      },
      {
        title: "核心模块",
        items: [
          "合同拟定模块包含基本信息、正文、签署方、签章位置、计划/项目关联和提交接口，核心路径为 /contract/preparation。",
          "合同签署模块围绕 /contract/sign，处理签署提交、我方签章、短信验证码、签署校验和签署状态查询。",
          "合同审批模块通过流程中心完成审批任务，管理与检索模块支持列表、详情、下载、可见范围、调整、删除、诊断和修复。",
          "模板、文件、PDF、OCR、合合文档解析和印章提取支撑模板合同生成、离线文件识别、文件上传下载与预览。",
        ],
      },
      {
        title: "专家协议智能体创建",
        items: [
          "入口为 POST /contract/agent/se/create，入参包含 basicInfo、signer、suppliers、planInfo、riskInfo、teachTime、teachDuration 等复合结构。",
          "流程不是只插入合同主表，而是将智能体结构化入参转换成内部合同 DTO，复用合同拟定与提交流程。",
          "系统保存 contract_info、contract_content、contract_signer、contract_sign_position、contract_plan_rel、contract_ext、contract_file 等多表数据。",
          "提交后生成主/子合同 PDF，调用流程中心创建审批流，写入 contract_relation_other_app，并返回合同编码。",
        ],
      },
      {
        title: "责任链与状态流转",
        items: [
          "合同生命周期大体是拟定/保存 -> 提交 -> 审批中 -> 待签署 -> 签署中 -> 已生效/归档，也存在驳回、撤回、作废和终止分支。",
          "合同提交、签署等复杂流程使用 BusinessHandler、ContractContext、ContractProcessBuilder 等处理器链编排。",
          "处理器分别负责参数校验、供应商/签署方校验、离线文件检查、PDF 生成、子合同创建、流程中心创建、状态更新和消息通知。",
          "这种设计让不同合同类型、签署方式、模板/非模板分支可以动态组合，线上排查也能定位到具体处理器。",
        ],
      },
      {
        title: "核心表与联调排查",
        items: [
          "contract_info 是合同聚合根，contract_content 保存正文结构，contract_signer 保存签署主体，contract_sign_position 保存签章页码和坐标。",
          "contract_file 关联 PDF 和文件中心 ID，contract_relation_other_app 保存流程中心实例、E签宝流程等外部关联，contract_visible_range 控制可见范围。",
          "联调重点包括流程中心审批人、文件中心 fileId、E签宝 fileKey、用户/组织/供应商数据、计划系统 planId、合合文档解析和 OCR 结果。",
          "日常排查会结合合同编码查主子合同、流程实例、文件记录、签署方、签章位置和定时任务补偿状态。",
        ],
      },
      {
        title: "模板、文件与 OCR",
        items: [
          "模板管理支持模板列表、启停、字段映射、预设签署方配置、模板预览、业务场景和合同类型配置。",
          "关键模板表包括 contract_template_config、contract_template_field_config、contract_template_scene、contract_template_signer_config。",
          "文件/PDF 模块处理合同 PDF 生成、上传、下载、预览、离线文件校验、TextIn/OCR 识别和印章提取。",
          "系统内部 fileId 是文件中心 ID，E签宝 fileKey 是电子签侧文件标识，两者在下载和签署联调时需要明确区分。",
        ],
      },
      {
        title: "外部系统集成",
        items: [
          "流程中心负责创建审批流和完成审批任务；E签宝负责发起签署流、签章、回调、账号同步和签署状态同步。",
          "文件中心负责合同文件上传下载预览；用户中心、组织中心和供应商中心提供人员、部门、专家、供应商和银行账号信息。",
          "计划系统负责活动计划和会议计划关联，消息中心负责审批/签署通知，配置中心提供授权代表、合同类型和金额区间配置。",
          "合合文档解析、TextIn/OCR 和百度 OCR 用于离线文件识别、印章识别和风险检查。",
        ],
      },
      {
        title: "定时任务与补偿",
        items: [
          "XXL-JOB 任务包含合同状态同步、合同 PDF 生成补偿、集团自动盖章 PDF 处理、Docsign 文件归档到飞书和用户同步到 E签宝。",
          "ContractStatusHandler 处理合同状态同步，ContractCreatePDFHandler 处理 PDF 生成补偿，OcrCheckHandler 处理 OCR 检查任务。",
          "当文件生成、签署状态、消息通知或归档链路出现异步不一致时，可通过定时任务补偿和 SQL 排查恢复状态。",
          "本地与 Linux 环境路径差异会影响 PDF 临时目录和字体路径，因此文件处理逻辑需要依赖配置和路径兼容。",
        ],
      },
      {
        title: "常见排查场景",
        items: [
          "合同没有 contract_file 时，检查 PDF 生成处理器、文件中心上传、主子合同写入位置、异步线程和事务提交情况。",
          "当前签署人不能签时，检查 contract_signer 的签署顺序、signerCode、合同状态以及主子合同 ID 是否匹配。",
          "流程中心提示操作人非审批人时，通过 contract_relation_other_app 找到 processInstId，再核对当前任务审批人与请求头用户。",
          "文件下载失败时，优先确认 contract_file.file_id 是否为空、是否拿 E签宝 fileKey 当文件中心 fileId、以及环境是否一致。",
        ],
      },
    ],
  },
];

const personalProjects = [
  {
    id: "yyoj",
    title: "YYOJ 在线判题系统",
    period: "2024.11 - 2025.07",
    repo: "https://github.com/51522yhj/yyoj",
    stack: ["Spring Cloud Alibaba", "Nacos", "Gateway", "OpenFeign", "RabbitMQ", "Redis", "MySQL"],
    summary:
      "前后端分离的在线判题与编程竞赛平台，支持用户注册登录、题库管理、在线写题、异步判题、代码沙箱、多语言执行、竞赛报名、排行榜/图表统计、评论点赞、文件上传和 AI 辅助出题。后端按网关、用户、题目、判题、代码沙箱和竞赛服务拆分，通过 RabbitMQ 承接耗时判题任务。",
    keyFacts: ["Spring Cloud 微服务", "RabbitMQ 异步判题", "代码沙箱", "AI 辅助出题"],
    points: [
      "题目服务保存提交记录并投递消息，判题服务消费后调用代码沙箱执行。",
      "支持 Java、C、C++、Python 执行分发，回写耗时、内存、输出和错误信息。",
      "通过策略模式比较输出与限制，写回 SUCCEED 与 JudgeInfo。",
      "竞赛提交使用独立 exchange/queue，避免和普通题提交混在一起。",
    ],
    flow: ["提交代码", "保存 WAITING 记录", "投递 RabbitMQ", "判题服务消费", "沙箱执行", "策略比较", "写回 JudgeInfo"],
    sequence: {
      lanes: ["用户/前端", "题目服务", "RabbitMQ", "判题服务", "代码沙箱", "MySQL"],
      messages: [
        ["用户/前端", "题目服务", "提交代码"],
        ["题目服务", "MySQL", "保存 WAITING"],
        ["题目服务", "RabbitMQ", "发送提交 ID"],
        ["RabbitMQ", "判题服务", "消费消息"],
        ["判题服务", "代码沙箱", "执行代码"],
        ["判题服务", "MySQL", "回写 JudgeInfo"],
      ],
    },
    detailSections: [
      {
        title: "系统定位",
        items: [
          "YYOJ 是前后端分离的在线判题与编程竞赛平台，支持注册登录、题库管理、在线写题、代码提交、异步判题、竞赛、排行榜、评论点赞、文件上传和 AI 辅助出题。",
          "后端拆分为网关、用户、题目、判题、代码沙箱、竞赛等服务，使用 Nacos 注册发现、Gateway 统一入口、OpenFeign 服务间调用。",
          "前端基于 Vue3、TypeScript、Arco Design、Monaco Editor、ByteMD 和 ECharts。",
        ],
      },
      {
        title: "异步判题链路",
        items: [
          "用户提交代码后，题目服务先校验题目和语言，保存提交记录，状态为 WAITING，并向 RabbitMQ 投递 questionSubmitId。",
          "判题服务消费消息，通过 Feign 查询提交记录、题目信息、判题用例和判题配置，然后把状态更新为 RUNNING。",
          "判题服务组装 ExecuteCodeRequest，调用代码沙箱执行多组输入用例，拿到输出、耗时、内存和错误信息。",
          "JudgeManager 按策略比较输出和限制，最终回写 SUCCEED 与 JudgeInfo，前端通过查询提交结果获取判题状态。",
        ],
      },
      {
        title: "RabbitMQ 与隔离",
        items: [
          "普通题提交使用 code_exchange、code_queue、my_routingKey；竞赛提交使用 code_exchange1、code_queue1、my_routingKey1。",
          "使用 MQ 的原因是提交接口可以快速返回 ID，判题任务排队消费，后续可横向扩展多个判题服务实例。",
          "竞赛提交和普通题提交拆队列，便于做优先级、隔离和统计，避免互相影响。",
          "先落库再投递消息，让任务具备可查询状态，失败时也更容易补偿或重试。",
        ],
      },
      {
        title: "判题与沙箱设计",
        items: [
          "判题服务使用 CodeSandboxFactory 根据配置创建沙箱，CodeSandboxProxy 做统一调用增强，JudgeStrategy 处理不同语言或题型的判断逻辑。",
          "代码沙箱对外暴露 /executeCode，通过内部 auth 请求头做基础鉴权，并按语言选择 Java、C++、C、Python 执行器。",
          "沙箱负责写入临时目录、编译、执行多组用例、收集输出和错误，判题服务负责业务状态和结果判断。",
          "当前沙箱适合学习和演示，生产级还应进一步加强 Docker/Firecracker、网络隔离、文件系统隔离、CPU/内存限制和超时强杀。",
        ],
      },
      {
        title: "用户、权限与网关",
        items: [
          "登录成功后生成 JWT token，并将 token:userId 写入 Redis，前端后续通过 Authorization 携带 token。",
          "Redis 让登录态可控，可支持退出登录、过期和在线状态判断；管理员可结合 Redis 判断用户是否在线。",
          "Gateway 统一路由到用户、题目、判题、沙箱和竞赛服务，并拦截 /**/inner/** 内部接口，避免外部直接访问内部判题接口。",
          "用户服务承载注册、登录、个人资料、管理员用户管理、评论、点赞和文件上传。",
        ],
      },
      {
        title: "题库与 AI 出题",
        items: [
          "题目服务支持创建、编辑、更新、删除、分页查询、我的题目、待审核题目和题目审核流程。",
          "Question 保存题目主体，JudgeCase 保存输入输出测试用例，JudgeConfig 保存时间、内存和栈限制。",
          "题目创建时将判题用例和判题配置序列化为 JSON，判题服务执行时再反序列化成 Java 对象。",
          "AI 辅助出题通过 AiManager 和提示词模板生成题目内容、答案、测试用例和判题配置。",
        ],
      },
      {
        title: "竞赛、互动与前端",
        items: [
          "竞赛模块支持发布竞赛、报名、查看报名人数、我创建/参与的竞赛、竞赛题目、竞赛提交、统计图表和排行榜。",
          "评论和点赞支持父子评论、我的评论、删除评论、点赞/取消点赞，并通过 comment 和 comment_like 表保存。",
          "前端包含题目列表、在线做题、提交记录、题目管理、题目审核、登录注册、竞赛列表、竞赛详情和排行榜页面。",
          "CodeEditor 基于 Monaco Editor，Markdown 编辑/展示使用 ByteMD，图表统计使用 ECharts。",
        ],
      },
      {
        title: "数据库与扩展方向",
        items: [
          "核心表包括 user、question、question_submit、competition、competition_question、competition_register、question_competition_submit、comment 和 comment_like。",
          "判题防重复依赖状态判断，可进一步使用 where id=? and status=WAITING 的条件更新或乐观锁增强幂等。",
          "失败处理可扩展 MQ 手动 ACK、NACK 重试、死信队列、失败原因日志和用户侧 System Error 展示。",
          "吞吐提升方向包括多判题实例、按语言拆队列、竞赛高优先级队列、沙箱池化、容器预热和测试用例缓存。",
        ],
      },
    ],
  },
  {
    id: "luhet",
    title: "录合同智能体 / Spring AI 改造",
    period: "2026.03",
    repo: "https://github.com/51522yhj/luhet_agent",
    stack: ["Spring Boot 3", "Spring AI Alibaba", "ReactAgent", "MemorySaver", "Tool Calling", "SSE"],
    summary:
      "将 Dify 录合同流程改造为 Spring AI Alibaba 应用，通过 ReactAgent、MemorySaver、Tool Calling 和 SSE 流式输出，把自然语言对话收束到可校验、可确认、可中断、可落库的合同创建业务流程。流程围绕 17 个业务接口组织合同创建、状态查询、规则校验、审批查看等 Tool。",
    keyFacts: ["17 个业务接口", "Tool Calling", "SSE 流式输出", "二次确认"],
    points: [
      "围绕 17 个接口组织合同创建、状态查询、规则校验、审批查看等 Tool。",
      "使用 SSE 输出模型思考、字段补全、风险检查和待确认项。",
      "保留用户二次确认，风险检查失败时中断创建流程并返回明确原因。",
      "Tool 调用结果回填到合同草稿，避免 AI 内容停留在非确定文本层。",
    ],
    flow: ["输入合同意图", "解析上下文", "选择 Tool", "调用合同接口", "风险校验", "用户确认", "创建合同并发起审批"],
    sequence: {
      lanes: ["用户", "前端", "Spring AI Agent", "业务 Tool", "合同系统", "SSE"],
      messages: [
        ["用户", "前端", "输入合同意图"],
        ["前端", "Spring AI Agent", "发起流式会话"],
        ["Spring AI Agent", "业务 Tool", "选择并调用 Tool"],
        ["业务 Tool", "合同系统", "查询/校验/草稿"],
        ["Spring AI Agent", "SSE", "输出待确认项"],
        ["用户", "合同系统", "确认后创建合同"],
      ],
    },
    detailSections: [
      {
        title: "改造目标",
        items: [
          "把 Dify 中较难沉淀到 Java 工程里的录合同流程，改造成基于 Spring AI Alibaba 的后端智能体应用。",
          "核心目标是保留大模型对话体验，同时让合同创建、查询、校验、审批等动作落到确定的业务接口和状态机里。",
          "通过 MemorySaver 保存对话上下文，通过 ReactAgent 和 Tool Calling 控制工具调用顺序。",
        ],
      },
      {
        title: "17 个接口分类",
        items: [
          "合同创建类：合同基础信息、签署方、正文、关联计划、文件生成和提交审批。",
          "查询类：合同状态、审批状态、模板信息、供应商/专家/计划信息查询。",
          "校验类：字段完整性、业务规则、风险检查、合同创建前置条件校验。",
          "辅助类：草稿保存、用户确认、错误原因返回和流程中断。",
        ],
      },
      {
        title: "流式与确认",
        items: [
          "SSE 用于把模型解析、字段补全、风险检查和待确认项分阶段推给前端，让用户看到流程进展。",
          "AI 生成内容不会直接落库，而是先形成合同草稿和待确认字段，用户确认后才调用创建和提交类 Tool。",
          "风险检查失败时中断后续 Tool 调用，返回明确失败原因，避免错误数据继续进入审批链路。",
        ],
      },
      {
        title: "确定性控制",
        items: [
          "Tool 入参采用结构化 DTO，模型只负责生成可校验字段，业务服务负责最终校验和执行。",
          "每个 Tool 的返回结果回填到上下文，后续步骤基于真实接口响应而不是模型猜测继续推进。",
          "如果智能体调用错接口，优先通过工具描述、参数校验、状态检查和异常中断来阻止错误流程落库。",
        ],
      },
    ],
  },
];

const vibeProjects = [
  {
    id: "shop",
    nav: "小程序",
    title: "源创潮牌工厂直营店",
    repo: "https://github.com/51522yhj/zsxcx",
    extra: links.admin,
    stack: ["微信小程序", "Vue 3", "Spring Boot 3", "MyBatis-Plus", "Element Plus"],
    summary:
      "已上线的小程序及后台管理项目，包含 Spring Boot 后端、Vue 管理端和原生微信小程序，支持商品展示、分类、详情、后台维护和云托管部署。",
    images: [
      "/assets/showcase/screen-09.png",
      "/assets/showcase/screen-10.jpg",
      "/assets/showcase/screen-11.jpg",
      "/assets/showcase/screen-06.jpg",
      "/assets/showcase/screen-07.jpg",
      "/assets/showcase/screen-08.jpg",
      "/assets/showcase/screen-01.png",
      "/assets/showcase/screen-02.png",
      "/assets/showcase/screen-03.png",
      "/assets/showcase/screen-04.png",
      "/assets/showcase/screen-05.png",
    ],
    points: ["三端工程结构清晰", "后台管理与小程序联动", "微信云托管部署", "线上后台地址可访问"],
  },
  {
    id: "zhishike",
    nav: "知时客",
    title: "知时客实时知识桌面助手",
    repo: "https://github.com/51522yhj/zhishike",
    stack: ["Electron", "React", "TypeScript", "科大讯飞语音转写", "阿里大模型接口"],
    summary:
      "Electron + React + TypeScript 桌面助手，聚焦会议、答题和知识辅助场景。语音转写和大模型接口可配置，结合知识库、屏幕上下文和个人提示词生成实时建议。",
    images: [
      "/assets/showcase/screenshot-05.png",
      "/assets/showcase/screenshot-06.png",
      "/assets/showcase/screenshot-01.png",
      "/assets/showcase/screenshot-02.png",
      "/assets/showcase/screenshot-03.png",
      "/assets/showcase/screenshot-04.png",
      "/assets/showcase/screenshot-07.png",
      "/assets/showcase/screenshot-08.png",
      "/assets/showcase/screenshot-09.png",
    ],
    points: ["悬浮建议条", "会议记录", "知识库导入", "模型与语音服务可配置"],
  },
  {
    id: "android",
    nav: "Android App",
    title: "体重轨迹 Android App",
    repo: "https://github.com/51522yhj/-app",
    stack: ["Kotlin", "Jetpack Compose", "Material 3", "本地存储", "Excel 导入导出"],
    summary:
      "用于本地体重记录和趋势观察的 Android 应用，支持目标体重、7 日均线、日历记录、备注标签、提醒和 Excel 备份。",
    images: ["/assets/showcase/app-overview.png", "/assets/showcase/app-excel.png"],
    points: ["本地隐私优先", "趋势和目标展示", "Excel 备份恢复"],
  },
  {
    id: "work",
    nav: "Work Record",
    title: "Work Record Desktop",
    repo: "https://github.com/51522yhj/work_record",
    stack: ["Electron", "React", "Vite", "Supabase", "Local JSON"],
    summary:
      "半透明桌面悬浮工作记录应用，支持快捷新增、状态优先级、附件、搜索筛选、透明度调节、本地 JSON 兜底和 Supabase 云端同步。",
    images: [
      "/assets/showcase/work-record-detail.png",
      "/assets/showcase/work-record-overview.jpg",
      "/assets/showcase/work-record-collapsed.jpg",
    ],
    points: ["记录详情与附件", "悬浮窗口", "云端同步", "快捷键呼出"],
  },
  {
    id: "history",
    nav: "历史长河",
    title: "中国历史长河可视化",
    repo: "https://github.com/51522yhj/histroyShow",
    stack: ["Vue 3", "Vite", "时间轴", "CloudBase", "本地图片资源"],
    summary:
      "横向拖拽式历史时间轴，支持通史与党史事件浏览、事件详情和图片展示，强调信息结构与沉浸式浏览。",
    images: [
      "/assets/showcase/showcase-history-river-yuan.png",
      "/assets/showcase/showcase-history-river-paper.png",
      "/assets/showcase/showcase-cpc-river.png",
    ],
    points: ["横向历史长河", "事件详情", "党史与通史双线", "图片资源本地化"],
  },
];

const skills = [
  "Java",
  "Spring Boot",
  "Spring Cloud Alibaba",
  "MyBatis-Plus",
  "RabbitMQ",
  "Kafka",
  "Redis",
  "Dubbo",
  "XXL-JOB",
  "Spring AI",
  "Zookeeper",
  "Nacos",
  "Vibe Coding",
  "Codex",
  "OpenCode",
];

const allDetails = [...enterpriseProjects, ...personalProjects, ...vibeProjects];

function useGateEntered() {
  const [entered, setEntered] = useState(() => {
    const forceIntro = new URLSearchParams(window.location.search).has("intro");
    return !forceIntro && window.sessionStorage.getItem("myjli-entered") === "true";
  });

  const enter = () => {
    window.sessionStorage.setItem("myjli-entered", "true");
    setEntered(true);
  };

  return [entered, enter];
}

function ParticleField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let raf = 0;
    let points = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      points = Array.from({ length: Math.min(110, Math.floor(width / 13)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 0.45,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const point of points) {
        point.x += point.vx;
        point.y += point.vy;
        if (point.x < 0 || point.x > width) point.vx *= -1;
        if (point.y < 0 || point.y > height) point.vy *= -1;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 113, 227, 0.34)";
        ctx.fill();
      }

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const a = points[i];
          const b = points[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 128) {
            ctx.strokeStyle = `rgba(0,113,227,${0.12 * (1 - d / 128)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    if (!reduced) draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas className="particle-field" ref={ref} aria-hidden="true" />;
}

function GateIntro({ entered, onEnter }) {
  const [opening, setOpening] = useState(false);
  const reduced = useReducedMotion();

  const start = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onEnter, reduced ? 80 : 1550);
  };

  return (
    <AnimatePresence>
      {!entered && (
        <motion.section className={`gate-intro ${opening ? "opening" : ""}`} exit={{ opacity: 0 }} transition={{ duration: 0.7 }}>
          <img className="gate-world-image" src="/assets/generated/celestial-gate.png" alt="" aria-hidden="true" />
          <div className="gate-cinematic-shade" aria-hidden="true" />
          <div className="real-gate-stage" aria-hidden="true">
            <div className="real-door real-door-left" />
            <div className="real-door real-door-right" />
            <div className="gate-rift" />
            <div className="gate-crystal-flare" />
          </div>
          <div className="entry-mist entry-mist-one" aria-hidden="true" />
          <div className="entry-mist entry-mist-two" aria-hidden="true" />
          <div className="entry-stars" aria-hidden="true" />
          <div className="entry-portal" aria-hidden="true" />
          <motion.div
            className="gate-copy fantasy-copy"
            initial={{ opacity: 0, y: 10 }}
            animate={opening ? { opacity: 0, y: -34, scale: 0.96, filter: "blur(14px)" } : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: opening ? 0.65 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>Yuhaojun Resume Portal</span>
            <h1>Y U H A O J U N</h1>
            <p>企业后端 · AI 工程化 · VibeCoding</p>
            <MagneticButton onClick={start} className="enter-world-button">
              点击进入 <ArrowRight weight="bold" />
            </MagneticButton>
            <small>Click to explore the resume world</small>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

function MagneticButton({ children, href, onClick, className = "" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18 });
  const sy = useSpring(y, { stiffness: 260, damping: 18 });
  const Component = href ? motion.a : motion.button;
  const props = href ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: "noreferrer" } : { type: "button", onClick };

  return (
    <Component
      className={`magnetic-button ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.14);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.14);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="回到首页">
        <span>Y</span>
        Yuhaojun
      </a>
      <nav aria-label="主导航">
        {navItems.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <a className="download" href={links.resume} download>
        下载 PDF
      </a>
    </header>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 42, filter: "blur(12px)" }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <section id="top" className="hero-section" ref={ref}>
      <motion.div className="hero-visual-plane" style={{ y, scale }}>
        <img src="/assets/generated/gate-open.svg" alt="" aria-hidden="true" />
      </motion.div>
      <div className="hero-content">
        <Reveal>
          <p className="hero-kicker">Java Backend · AI Application · Microservices</p>
          <h1>于昊骏</h1>
          <p className="hero-copy">
            熟悉 Spring Boot、Spring Cloud Alibaba、RabbitMQ、Kafka、Redis、Dubbo、XXL-JOB。参与企业级智能审核、合同全生命周期系统，也做过从开发到上线的 VibeCoding 项目。
          </p>
          <div className="hero-actions">
            <MagneticButton href="mailto:879406927@qq.com">879406927@qq.com</MagneticButton>
            <MagneticButton href="tel:13840526193" className="button-soft">
              138-4052-6193
            </MagneticButton>
            <MagneticButton href={links.github} className="button-soft">
              <GithubLogo weight="bold" /> GitHub
            </MagneticButton>
            <MagneticButton href={links.note} className="button-soft">
              <LinkSimple weight="bold" /> 语雀笔记
            </MagneticButton>
          </div>
        </Reveal>
        <Reveal className="portrait-stage" delay={0.15}>
          <div className="portrait-orbit orbit-one" />
          <div className="portrait-orbit orbit-two" />
          <img src="/assets/resume/avatar.jpg" alt="于昊骏证件照" />
          <div className="focus-panel">
            <span>Current Focus</span>
            <strong>企业后端 · AI 工程化</strong>
            <small>南京正大天晴后端工程师</small>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SectionTitle({ label, title, text }) {
  return (
    <Reveal className="section-title">
      <span>{label}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  );
}

function WorkExperience() {
  return (
    <section id="work" className="content-section work-section">
      <SectionTitle label="Experience Orbit" title="工作经历" text="按真实经历展开，突出岗位、项目语境和后端交付能力。" />
      <div className="work-orbit">
        {workExperience.map((item, index) => (
          <Reveal key={item.company} className="work-node" delay={index * 0.08}>
            <time>{item.time}</time>
            <div>
              <h3>{item.company}</h3>
              <strong>{item.role}</strong>
              <p>{item.text}</p>
              <ul className="work-detail-list">
                {(item.details || []).map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <div className="tag-row">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function EnterpriseProjects({ onDetail }) {
  return (
    <section id="enterprise" className="content-section enterprise-section">
      <SectionTitle label="Enterprise Systems" title="企业项目" text="把复杂企业系统讲清楚：业务边界、数据链路、职责与排查能力。" />
      <div className="enterprise-track">
        {enterpriseProjects.map((project, index) => {
          const Icon = project.icon;
          return (
            <Reveal className="enterprise-panel" key={project.id} delay={index * 0.1}>
              <div className="panel-icon">
                <Icon weight="duotone" />
              </div>
              <div>
                <span>{project.label}</span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="fact-row">
                  {(project.keyFacts || []).slice(0, 4).map((fact) => (
                    <span key={fact}>{fact}</span>
                  ))}
                </div>
                <div className="tag-row">
                  {project.stack.slice(0, 5).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <button className="text-button" type="button" onClick={() => onDetail(project)}>
                  查看项目详情 <ArrowRight weight="bold" />
                </button>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function FlowLine({ steps }) {
  return (
    <div className="flow-line">
      {steps.map((step, index) => (
        <div className="flow-step" key={step}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <p>{step}</p>
        </div>
      ))}
    </div>
  );
}

function SequenceDiagram({ project }) {
  const lanes = project.sequence?.lanes || [];
  const messages = project.sequence?.messages || [];

  if (!lanes.length || !messages.length) {
    return <FlowLine steps={project.flow} />;
  }

  return (
    <div className="sequence-diagram" aria-label={`${project.title} 时序图`}>
      <div className="sequence-lanes" style={{ "--lane-count": lanes.length }}>
        {lanes.map((lane) => (
          <div className="sequence-lane" key={lane}>
            <span>{lane}</span>
          </div>
        ))}
      </div>
      <div className="sequence-messages">
        {messages.map(([from, to, label], index) => {
          const fromIndex = Math.max(0, lanes.indexOf(from));
          const toIndex = Math.max(0, lanes.indexOf(to));
          const start = Math.min(fromIndex, toIndex);
          const end = Math.max(fromIndex, toIndex);
          const reverse = fromIndex > toIndex;
          return (
            <div
              className={`sequence-message ${reverse ? "reverse" : ""}`}
              key={`${label}-${index}`}
              style={{
                "--row": index + 1,
                "--start": start + 1,
                "--span": end - start + 1,
              }}
            >
              <span>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PersonalProjects({ onDetail }) {
  return (
    <section id="projects" className="content-section projects-section">
      <SectionTitle label="Personal Systems" title="个人项目" text="选择能体现后端架构、AI 工具调用和异步流程设计的项目重点展示。" />
      <div className="project-stack">
        {personalProjects.map((project, index) => (
          <Reveal className="project-panel" key={project.id} delay={index * 0.08}>
            <div className="project-copy">
              <time>{project.period}</time>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="fact-row">
                {(project.keyFacts || []).slice(0, 4).map((fact) => (
                  <span key={fact}>{fact}</span>
                ))}
              </div>
              <div className="tag-row">
                {project.stack.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="button-row">
                <a className="text-button" href={project.repo} target="_blank" rel="noreferrer">
                  <GithubLogo weight="bold" /> 查看仓库
                </a>
                <button className="text-button" type="button" onClick={() => onDetail(project)}>
                  查看详情 <ArrowRight weight="bold" />
                </button>
              </div>
            </div>
            <SequenceDiagram project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function VibeCodingWorks({ onDetail }) {
  const [active, setActive] = useState(0);
  const project = vibeProjects[active];

  return (
    <section id="vibecoding" className="content-section vibe-section">
      <SectionTitle label="VibeCoding Works" title="VibeCoding 作品" text="每个作品单独导航，用户手动切换项目和图片，展示真实 README 截图与仓库链接。" />
      <Reveal className="vibe-shell">
        <div className="vibe-nav" role="tablist" aria-label="VibeCoding 项目">
          {vibeProjects.map((item, index) => (
            <button className={active === index ? "active" : ""} key={item.id} type="button" onClick={() => setActive(index)}>
              {item.nav}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            className="vibe-content"
            key={project.id}
            initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
            transition={{ duration: 0.45 }}
          >
            <div className="vibe-copy">
              <span>VibeCoding 作品</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="tag-row">
                {project.stack.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="button-row">
                <a className="text-button" href={project.repo} target="_blank" rel="noreferrer">
                  <GithubLogo weight="bold" /> 查看仓库
                </a>
                {project.extra && (
                  <a className="text-button" href={project.extra} target="_blank" rel="noreferrer">
                    <GlobeHemisphereWest weight="bold" /> 后台地址
                  </a>
                )}
                <button className="text-button" type="button" onClick={() => onDetail(project)}>
                  查看详情 <ArrowRight weight="bold" />
                </button>
              </div>
            </div>
            <ImageCarousel key={project.id} project={project} />
          </motion.div>
        </AnimatePresence>
      </Reveal>
    </section>
  );
}

function ImageCarousel({ project }) {
  const [index, setIndex] = useState(0);
  const images = project.images || [];
  const goPrev = () => setIndex((value) => (value - 1 + images.length) % images.length);
  const goNext = () => setIndex((value) => (value + 1) % images.length);

  return (
    <div className="image-carousel">
      <AnimatePresence mode="wait">
        <motion.img
          key={`${project.id}-${index}`}
          src={images[index]}
          alt={`${project.title} 示例图 ${index + 1}`}
          loading="lazy"
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.02, y: -18 }}
          transition={{ duration: 0.45 }}
        />
      </AnimatePresence>
      {images.length > 1 && (
        <div className="carousel-arrows">
          <button type="button" onClick={goPrev} aria-label="上一张图片">
            <CaretLeft weight="bold" />
            上一张
          </button>
          <button type="button" onClick={goNext} aria-label="下一张图片">
            下一张
            <CaretRight weight="bold" />
          </button>
        </div>
      )}
      <div className="carousel-dots">
        {images.map((image, dotIndex) => (
          <button
            key={image}
            className={dotIndex === index ? "active" : ""}
            type="button"
            aria-label={`查看第 ${dotIndex + 1} 张图`}
            onClick={() => setIndex(dotIndex)}
          />
        ))}
      </div>
    </div>
  );
}

function Skills() {
  const arranged = useMemo(
    () =>
      skills.map((skill, index) => ({
        skill,
        angle: (index / skills.length) * 360,
      })),
    []
  );

  return (
    <section id="skills" className="content-section skills-section">
      <SectionTitle label="Skill Constellation" title="专业技能" text="后端主栈、工程化工具和 Vibe Coding 经验共同构成当前能力重心。" />
      <Reveal className="skill-stage">
        <div className="skill-core">
          <Sparkle weight="fill" />
          <strong>Java Backend</strong>
          <span>AI Engineering</span>
        </div>
        {arranged.map(({ skill, angle }) => (
          <span className="skill-chip" key={skill} style={{ "--angle": `${angle}deg` }}>
            {skill}
          </span>
        ))}
      </Reveal>
      <Reveal className="skill-proof">
        <p>熟练使用 Vibe Coding，有 Codex、OpenCode 等工具实践经验。具备实际线上网站、小程序上线经验。</p>
      </Reveal>
    </section>
  );
}

function DetailModal({ item, onClose }) {
  if (!item) return null;
  return createPortal(
    <AnimatePresence>
      <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.article
          className="detail-modal"
          initial={{ opacity: 0, y: 40, scale: 0.96, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, y: 28, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 150, damping: 22 }}
          onClick={(event) => event.stopPropagation()}
        >
          <button className="modal-close" type="button" onClick={onClose} aria-label="关闭详情">
            <X weight="bold" />
          </button>
          <span className="modal-label">Project Detail</span>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
          {item.keyFacts && (
            <div className="modal-facts">
              {item.keyFacts.map((fact) => (
                <span key={fact}>{fact}</span>
              ))}
            </div>
          )}
          <div className="modal-grid">
            <section>
              <h4>主要亮点</h4>
              <ul>
                {(item.points || []).map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </section>
            <section>
              <h4>技术栈</h4>
              <div className="tag-row">
                {(item.stack || []).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              {item.repo && (
                <a className="repo-link" href={item.repo} target="_blank" rel="noreferrer">
                  <GithubLogo weight="bold" /> {item.repo}
                </a>
              )}
              {item.extra && (
                <a className="repo-link" href={item.extra} target="_blank" rel="noreferrer">
                  <LinkSimple weight="bold" /> {item.extra}
                </a>
              )}
            </section>
          </div>
          {item.detailSections && (
            <div className="detail-sections">
              {item.detailSections.map((section) => (
                <section key={section.title}>
                  <h4>{section.title}</h4>
                  <ul>
                    {section.items.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
          {item.flow && (
            <div className="modal-flow">
              {item.flow.map((step, index) => (
                <div key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </div>
              ))}
            </div>
          )}
        </motion.article>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <strong>Yuhaojun · Java Backend</strong>
    </footer>
  );
}

export default function App() {
  const [entered, enter] = useGateEntered();
  const [detail, setDetail] = useState(null);

  return (
    <>
      <ParticleField />
      <GateIntro entered={entered} onEnter={enter} />
      <Header />
      <motion.main
        className="explorer-layout"
        initial={false}
        animate={entered ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0.28, filter: "blur(10px)" }}
        transition={{ duration: 0.7 }}
      >
        <Hero />
        <WorkExperience />
        <EnterpriseProjects onDetail={setDetail} />
        <PersonalProjects onDetail={setDetail} />
        <VibeCodingWorks onDetail={setDetail} />
        <Skills />
      </motion.main>
      <Footer />
      <DetailModal item={detail} onClose={() => setDetail(null)} />
      <div className="source-note" hidden>
        {allDetails.length} project records loaded.
      </div>
    </>
  );
}
