import React, { useEffect, useState } from 'react'
import { dummyAccountsData, PLATFORMS } from '../assets/assets'
import { PlusIcon } from 'lucide-react'
import AccountList from '../components/AccountList'
import PlatformPickerModal from '../components/PlatformPickerModal'

const Accounts = () => {

  const [accounts, setAccounts] = useState([])
  const [connecting, setConnecting] = useState(null)
  const [showPlatformPicker, setShowPlatformPicker] = useState(false)

  const fetchAccounts = async (isSync = false, platform, successMsg) => {
    setAccounts(dummyAccountsData)
    console.log(isSync, platform, successMsg);

  }

  useEffect(() => {
    fetchAccounts()
  }, []);

  const handleConnect = async (platformId) => {
    setConnecting(platformId)
    setTimeout(() => {
      setConnecting(null)
      setAccounts((prev) => [...prev, dummyAccountsData[0]])
      setShowPlatformPicker(flase)
    }, 1000);
  }

  const handleDisconnect = async (accountId) => {
    setAccounts(accounts.filter((a) => a._id !== accountId))
  }

  const connectedIds = accounts.map((a) => a.platform)

  return (
    <div className='space-y-8 max-w-4xl'>

      {/* Header */}

      <div className="mb-6 flex flex-col gap-4  sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl  text-slate-800">
            Connected Accounts
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {accounts.length} of {PLATFORMS.length} platforms connected
          </p>
        </div>

        <button
          onClick={() => setShowPlatformPicker(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-red-600 active:scale-95"
        >
          <PlusIcon className="size-4" />
          Connect Account
        </button>
      </div>
      {/* Platform picker modal */}
      {showPlatformPicker && < PlatformPickerModal connectedIds={connectedIds} connecting={connecting} onClose={() => setShowPlatformPicker(false)} onConnect={handleConnect} />}


      {/* Connected accounts list  */}
      <AccountList accounts={accounts} onDisconnect={handleDisconnect} />

    </div>
  )
}

export default Accounts