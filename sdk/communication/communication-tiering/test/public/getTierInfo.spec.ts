// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Context } from "mocha";
import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import type { TieringClient } from "../../src";
import { assert } from "chai";
import { createRecordedClient } from "./utils/recordedClient";

describe(`TieringClient - Get Tier Info`, function () {
  let recorder: Recorder;
  let client: TieringClient;

  beforeEach(async function (this: Context) {
    ({ client, recorder } = await createRecordedClient(this));
  });

  afterEach(async function (this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("get tier info", async function () {
    // print all tier info
    const resourceId = env.RESOURCE_ID!;
    const tierInfo = await client.getTierByResourceId(resourceId);
    assert.isNotNull(tierInfo);
  }).timeout(30000);
});
