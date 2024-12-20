async function logAdapterInfo(adapter) {
  console.log("Adapter Info:");
  console.log(adapter.info);
}

async function checkGPUAvailability() {
  if (!navigator.gpu) {
    console.log("WebGPU not supported on this browser.");
    return;
  }

  console.log("Requesting WebGPU adapter...");
  const adapter = await navigator.gpu.requestAdapter();

  if (!adapter) {
    console.log("No WebGPU adapter found.");
  } else {
    console.log("WebGPU adapter found:");
    console.log(adapter);

    await logAdapterInfo(adapter);

    await createDevice(adapter);
  }
}

async function createDevice(adapter) {
  try {
    console.log("Requesting device...");
    const device = await adapter.requestDevice();
    console.log("Device created:");
    console.log(device);
  } catch (error) {
    console.log(`Device creation failed: ${error}`);
  }
}

async function requestHighPerformanceAdapter() {
  console.log("\nTrying to request high-performance adapter...");
  const highPerformanceAdapter = await navigator.gpu.requestAdapter({
    powerPreference: "high-performance",
  });
  if (highPerformanceAdapter) {
    console.log("High performance adapter found:");
    console.log(highPerformanceAdapter);
    await logAdapterInfo(highPerformanceAdapter);
  } else {
    console.log("No high-performance adapter found.");
  }
}

async function initWebGPU() {
  await checkGPUAvailability();
  await requestHighPerformanceAdapter();
}

initWebGPU();
