function createUrl(path, query = []) {
  const parts = path.split("/").filter(Boolean);
  return {
    raw: `{{baseUrl}}${path}`,
    host: ["{{baseUrl}}"],
    path: parts,
    query: query.map((q) => ({ key: q.key, value: q.value, disabled: false })),
  };
}

function req(name, method, path, options = {}) {
  const headers = [
    { key: "Content-Type", value: "application/json", type: "text" },
    { key: "x-organization-id", value: "{{organizationId}}", type: "text" },
    { key: "x-branch-id", value: "{{branchId}}", type: "text" },
    ...(options.headers || []),
  ];

  const item = {
    name,
    request: {
      auth: options.noAuth
        ? { type: "noauth" }
        : { type: "bearer", bearer: [{ key: "token", value: "{{authToken}}", type: "string" }] },
      method,
      header: headers,
      url: createUrl(path, options.query),
      description: options.description || "",
    },
    response: [],
  };

  if (options.body) {
    item.request.body = {
      mode: "raw",
      raw: JSON.stringify(options.body, null, 2),
      options: { raw: { language: "json" } },
    };
  }

  if (options.tests) {
    item.event = [
      {
        listen: "test",
        script: {
          exec: Array.isArray(options.tests) ? options.tests : [options.tests],
          type: "text/javascript",
        },
      },
    ];
  }

  return item;
}

module.exports = { createUrl, req };
