import CheckoutChart from '@/components/checkoutChart/chechoutChart'
import FullMenuSSR from '@/components/header/FullMenuSSR'
import BodyPrvider from '@/components/ui-providers/BodyProvider'
export default function ChartPage() {
  return (
    <>
    <FullMenuSSR />
    <BodyPrvider>
      <CheckoutChart />
    </BodyPrvider>
    {/* ننن */}
    </>
  )
}
