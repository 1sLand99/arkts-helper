#!/usr/bin/env node

/**
 * 测试 MCP 是否真正支持并发调用
 *
 * 验证方法：
 * 1. 同时发起 3 个请求
 * 2. 记录每个请求的开始和结束时间
 * 3. 并行：总耗时 ≈ 单个请求耗时
 * 4. 串行：总耗时 ≈ 3 × 单个请求耗时
 */

import { huaweiQA } from './dist/huawei-qa.js';

const questions = [
  'Navigation 组件如何实现页面跳转',
  'List 组件如何优化性能',
  '@State 和 @Prop 的区别是什么'
];

async function testSequential() {
  console.log('\n=== 测试 1: 串行调用 ===');
  const startTime = Date.now();

  for (let i = 0; i < questions.length; i++) {
    const qStartTime = Date.now();
    console.log(`\n[${i + 1}] 开始: ${questions[i].substring(0, 30)}...`);
    await huaweiQA(questions[i], true);
    const qElapsed = Date.now() - qStartTime;
    console.log(`[${i + 1}] 完成 (耗时: ${qElapsed}ms)`);
  }

  const totalElapsed = Date.now() - startTime;
  console.log(`\n串行总耗时: ${totalElapsed}ms (${(totalElapsed / 1000).toFixed(2)}s)`);
  return totalElapsed;
}

async function testParallel() {
  console.log('\n=== 测试 2: 并行调用 ===');
  const startTime = Date.now();
  const results = [];

  // 同时发起所有请求
  const promises = questions.map(async (q, i) => {
    const qStartTime = Date.now();
    console.log(`[${i + 1}] 开始: ${q.substring(0, 30)}...`);

    const answer = await huaweiQA(q, true);

    const qElapsed = Date.now() - qStartTime;
    console.log(`[${i + 1}] 完成 (耗时: ${qElapsed}ms)`);

    return { index: i + 1, elapsed: qElapsed };
  });

  const completed = await Promise.all(promises);
  const totalElapsed = Date.now() - startTime;

  console.log(`\n并行总耗时: ${totalElapsed}ms (${(totalElapsed / 1000).toFixed(2)}s)`);
  console.log('各请求耗时:', completed.map(r => `[${r.index}] ${r.elapsed}ms`).join(', '));

  return { totalElapsed, individual: completed };
}

async function main() {
  console.log('====================================');
  console.log('MCP 并发调用验证测试');
  console.log('====================================');

  // 先测试串行
  const sequentialTime = await testSequential();

  // 等待一下避免 API 限流
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 再测试并行
  const { totalElapsed: parallelTime, individual } = await testParallel();

  // 分析结果
  console.log('\n====================================');
  console.log('结果分析');
  console.log('====================================');
  console.log(`串行耗时: ${(sequentialTime / 1000).toFixed(2)}s`);
  console.log(`并行耗时: ${(parallelTime / 1000).toFixed(2)}s`);
  console.log(`加速比: ${(sequentialTime / parallelTime).toFixed(2)}x`);

  if (parallelTime < sequentialTime / 2) {
    console.log('\n✅ 结论: MCP 支持并行调用！');
  } else {
    console.log('\n❌ 结论: MCP 不支持并行调用（或并行效果不明显）');
  }

  // 检查请求是否真正并行
  const maxIndividualTime = Math.max(...individual.map(r => r.elapsed));
  console.log(`\n单个请求最长耗时: ${(maxIndividualTime / 1000).toFixed(2)}s`);
  console.log(`并行总耗时: ${(parallelTime / 1000).toFixed(2)}s`);

  if (parallelTime <= maxIndividualTime * 1.2) {
    console.log('✅ 请求是真正并行的（总耗时 ≈ 最长单个请求耗时）');
  } else {
    console.log('❌ 请求是串行的（总耗时 ≈ 单个请求耗时之和）');
  }
}

main().catch(console.error);
