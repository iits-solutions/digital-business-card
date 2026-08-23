"use client";

import { useState } from "react";

type AgentStatus = {
  success: boolean;
  agent?: string;
  version?: string;
  status?: string;
  reader_connected?: boolean;
  reader?: string | null;
};

type ReaderInfo = {
  success: boolean;
  reader_count?: number;
  readers?: {
    name: string;
    is_acr122: boolean;
  }[];
};

type NfcResult = {
  success: boolean;
  reader_connected?: boolean;
  reader?: string | null;
  card_present?: boolean;
  uid?: string | null;
  message?: string;
};

export default function NfcLocalTestPage() {
  const [agentStatus, setAgentStatus] =
    useState<AgentStatus | null>(null);

  const [readerInfo, setReaderInfo] =
    useState<ReaderInfo | null>(null);

  const [nfcResult, setNfcResult] =
    useState<NfcResult | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function checkAgent() {
    try {
      const response = await fetch(
        "http://127.0.0.1:8765/status",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      setAgentStatus(data);
      setError(null);
    } catch {
      setAgentStatus(null);
      setReaderInfo(null);
      setNfcResult(null);

      setError(
        "NFC Local Agent is not running on this computer."
      );
    }
  }

  async function checkReader() {
    try {
      const response = await fetch(
        "http://127.0.0.1:8765/nfc/reader",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      setReaderInfo(data);
    } catch {
      setReaderInfo(null);
    }
  }

  async function scanCard() {
    setLoading(true);
    setError(null);
    setNfcResult(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:8765/nfc/read",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data = await response.json();

      setNfcResult(data);

      if (!data.success) {
        setError(
          data.message || "Unable to read NFC reader."
        );
      }
    } catch {
      setError(
        "Unable to connect to the NFC Local Agent."
      );
    } finally {
      setLoading(false);
    }
  }

  async function refreshAll() {
    await checkAgent();
    await checkReader();
  }

  function formatUid(uid: string | null | undefined) {
    if (!uid) {
      return "—";
    }

    return uid.match(/.{1,2}/g)?.join(" ") || uid;
  }

  const agentConnected =
    agentStatus?.status === "running";

  const readerConnected =
    agentStatus?.reader_connected === true;

  const cardPresent =
    nfcResult?.card_present === true;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        padding: "50px 20px",
        fontFamily:
          "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "30px",
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h1
            style={{
              marginTop: 0,
              marginBottom: "8px",
            }}
          >
            iLinq.Team NFC Reader
          </h1>

          <p
            style={{
              color: "#666",
              marginTop: 0,
            }}
          >
            Local ACR122U NFC reader test
          </p>

          {/* Agent status */}

          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "16px",
              marginTop: "25px",
            }}
          >
            <strong>
              NFC Local Agent
            </strong>

            <div style={{ marginTop: "10px" }}>
              {agentConnected ? (
                <span>
                  🟢 Connected
                </span>
              ) : (
                <span>
                  ⚪ Not checked
                </span>
              )}
            </div>

            {agentStatus?.version && (
              <div
                style={{
                  marginTop: "6px",
                  color: "#666",
                  fontSize: "14px",
                }}
              >
                Version: {agentStatus.version}
              </div>
            )}
          </div>

          {/* Reader status */}

          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "16px",
              marginTop: "15px",
            }}
          >
            <strong>
              NFC Reader
            </strong>

            <div style={{ marginTop: "10px" }}>
              {readerConnected ? (
                <span>
                  🟢 Connected
                </span>
              ) : (
                <span>
                  ⚪ Not detected
                </span>
              )}
            </div>

            {agentStatus?.reader && (
              <div
                style={{
                  marginTop: "6px",
                  color: "#666",
                  fontSize: "14px",
                }}
              >
                Reader: {agentStatus.reader}
              </div>
            )}
          </div>

          {/* Card status */}

          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "16px",
              marginTop: "15px",
            }}
          >
            <strong>
              NFC Card
            </strong>

            <div style={{ marginTop: "10px" }}>
              {cardPresent ? (
                <span>
                  🟢 Card detected
                </span>
              ) : (
                <span>
                  ⚪ No card detected
                </span>
              )}
            </div>
          </div>

          {/* UID */}

          {nfcResult?.uid && (
            <div
              style={{
                marginTop: "20px",
                padding: "20px",
                background: "#f0f2f5",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  color: "#666",
                  marginBottom: "8px",
                }}
              >
                NFC UID
              </div>

              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                  wordBreak: "break-all",
                }}
              >
                {formatUid(nfcResult.uid)}
              </div>
            </div>
          )}

          {/* Error */}

          {error && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                borderRadius: "10px",
                background: "#fff1f1",
                border: "1px solid #f0b0b0",
                color: "#a00000",
              }}
            >
              {error}
            </div>
          )}

          {/* Buttons */}

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "25px",
            }}
          >
            <button
              onClick={refreshAll}
              style={{
                padding: "12px 18px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                background: "white",
                cursor: "pointer",
              }}
            >
              Check Reader
            </button>

            <button
              onClick={scanCard}
              disabled={loading}
              style={{
                padding: "12px 20px",
                border: "none",
                borderRadius: "8px",
                background: "#111",
                color: "white",
                cursor: loading
                  ? "wait"
                  : "pointer",
                fontWeight: "bold",
              }}
            >
              {loading
                ? "Reading..."
                : "Scan NFC Card"}
            </button>
          </div>

          {/* Technical information */}

          <div
            style={{
              marginTop: "30px",
              paddingTop: "20px",
              borderTop: "1px solid #eee",
              color: "#777",
              fontSize: "13px",
            }}
          >
            Local Agent:
            {" "}
            http://127.0.0.1:8765
          </div>
        </div>
      </div>
    </main>
  );
}