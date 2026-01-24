#!/usr/bin/env node

/**
 * 测试批量问答功能
 */

import { huaweiQA, huaweiQABatch } from './dist/huawei-qa.js';

const questions = [
  'Navigation 组件如何实现页面跳转',
  'List 组件如何优化性能',
  '@State 和 @Prop 的区别是什么'
];

async function testBatch() {
  console.log('====================================');
  console.log('批量问答测试');
  console.log('====================================\n');

  console.log(`测试问题数: ${questions.length}`);
  console.log('问题列表:');
  questions.forEach((q, i) => console.log(`  ${i + 1}. ${q}`));

  console.log('\n--- 开始批量问答（并行）---\n');
  const startTime = Date.now();

  const results = await huaweiQABatch(questions, true);

  const totalTime = Date.now() - startTime;

  console.log('\n====================================');
  console.log('结果');
  console.log('====================================\n');

  results.forEach((result, i) => {
    console.log(`[${i + 1}] 问题: ${result.query}`);
    console.log(`    状态: ${result.success ? '✅ 成功' : '❌ 失败'}`);
    if (result.error) {
      console.log(`    错误: ${result.error}`);
    }
    if (result.answer) {
      const preview = result.answer.substring(0, 100);
      console.log(`    答案预览: ${preview}...`);
    }
    console.log('');
  });

  console.log(`总耗时: ${(totalTime / 1000).toFixed(2)}s`);
  console.log(`成功: ${results.filter(r => r.success).length}/${results.length}`);
}

testBatch().catch(console.error);
