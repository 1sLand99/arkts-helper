// Test script for MCP Resources functionality
import { spawn } from 'child_process';

// Start the MCP server and send test requests
const server = spawn('node', ['dist/index.js'], {
    cwd: '/Volumes/T7/WebstormProjects/arkts-mcp-server',
    stdio: ['pipe', 'pipe', 'inherit']
});

// MCP JSON-RPC request
const listToolsRequest = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/list',
    params: {}
};

const listResourcesRequest = {
    jsonrpc: '2.0',
    id: 2,
    method: 'resources/list',
    params: {}
};

let buffer = '';

server.stdout.on('data', (data) => {
    buffer += data.toString();
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
        if (line.trim()) {
            try {
                const response = JSON.parse(line);
                console.log('Response:', JSON.stringify(response, null, 2));
            } catch (e) {
                console.log('Raw:', line);
            }
        }
    }
});

// Send requests
setTimeout(() => {
    console.log('Sending list_tools request...');
    server.stdin.write(JSON.stringify(listToolsRequest) + '\n');
}, 500);

setTimeout(() => {
    console.log('Sending list_resources request...');
    server.stdin.write(JSON.stringify(listResourcesRequest) + '\n');
}, 1000);

setTimeout(() => {
    console.log('Test complete, killing server...');
    server.kill();
    process.exit(0);
}, 2000);
